//initializing Router
import { Router } from 'express';
import { 
    verifyToken, 
    generateAccessToken, 
    generateRefreshToken,
    saveUser,
    checkUser 
} from './Authentication.js';
import  mailService  from '../Mail/mailService.js';

//initializing router object
const router = Router();


/*
* defining general cookie options
* refrehToken will by default expire after 1 day, 
* which is set in the function generateRefreshToken, 
* it will also have an option of modifying expiration to 90 days, if rememberMe is true
*/
const refreshCookieOptions = {
        httpOnly: true,
        sameSite: 'strict',
        //maxAge: 86400000 * expire  // default 1 day
}

//accessToken will by default expire after 15 min
const accessCookieOptions =   {
        httpOnly: true,
        sameSite: 'strict',
        maxAge:  900000     //15min
}



function authenticate(req, res){

    /**
     *  This function is to authenticate tokens,
     *  this method will return a user object if tokens are available and valid
     *  a function similar to this that only checks and validates the token will be needed
     *  if an endpoint that return sensitive information is requested, in this project there are none
     */


    //retreiving token if exists
    const accessToken = req.cookies._accessToken && req.cookies._accessToken.token;
    const refreshToken = req.cookies._refreshToken && req.cookies._refreshToken.token;
  
    
    if(accessToken !== undefined){

        //verfying token
        verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET)
        .then((user) => {
            //returning user if valid token
            res.status(201).send({data: user})
        })
        .catch((e) => {
            res.status(403).send({message: 'Access Token Expired'});
        })
    }

    else if(refreshToken !== undefined){
        verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        .then((user) => {
            //if refresh token valid
            //generating new accessToken
            const accessToken = generateAccessToken(user);

            
            res.cookie('_accessToken', {token:accessToken}, accessCookieOptions);
            res.status(201).send({data: user});
        })
        .catch((e) => {
            res.status(403).send({message: 'Refresh Token Expired'});
        })
    }
    else{
        res.status(403).send({message: 'Neither work'});
    }
}


//  /logout endpoint, will delete the stored token in cookie
router.delete('/Auth/logout', (req,res) => {
    res.clearCookie('_accessToken');
    res.clearCookie('_refreshToken');
    res.cookie('rememberMe', false);
    res.status(201).send()
})

/*
*   Auth end point. will keep a user logged in if token are valid
*   frontend each time it is refreshed, will fetch to /Auth end point, 
*   this will check whether access or refresh token are defined
*   if not, then frontend will redirect to login page 
*   becuase this is a special end point that is directly fetched from main.js in frontend, 
*   and not a middleware that is run every time a request comes in
*   a specific authenticate function is defined to be used not only in /Auth endpoint
*   but also before reaching any other sensitive endpoints that are not /Auth
*/
router.get('/Auth', authenticate)

//signup endpoint
router.post('/Auth/signup', (req,res) => {

    let user = req.body;
  
    //saveUser() method returns a promise
    saveUser(user)
    .then((result) => { 
        //if everything is good, cookies and response wil be set here
        //the result returns a user from mongoose, with unique _id
        user = result
    
        //generating both access and refresh token, assuming there are none generated already
        //accessToken will have expiration 
        const accessToken = generateAccessToken({id: user._id, name: user.name, email: user.email});

        //first parameter will be user info, name and email are not needed and id is more then enough
        //that is becuase the first parameter will only be available to the server
        //the second parameter, will be expiration, if null that means default of '1day', 
        //else it should be set as '10d' for 10 days and '90d' for 90 days .. 
        const refreshToken = generateRefreshToken({id: user._id, name: user.name, email: user.email}, null);
    
        //both tokens are set in cookie, inside an object, by doing that it is sligthly more encoded
        //the second parameter is the cookie options, both tokens each has it own cookie options for easier modification
        //both cookies will be httpOnly, and not accessible in other ways, also sameSite is strict, so only main domain has access 
        res.cookie('_accessToken', {token: accessToken}, accessCookieOptions);
        res.cookie('_refreshToken', {token: refreshToken}, refreshCookieOptions)
    
        //this will be a standard way of sending back user info, it will be put inside a user object, with only
        // id, name and email properties
        res.status(201).send({user:{id: user._id, name: user.name, email: user.email}})

        //confirmation email will be sent after everything
        const data = {
            to: user.email,
            type: 'register_confirmation',
            name: user.name,
        }
        mailService(data);
    
    })
    .catch((e) => {
        //if an error is caught, that can most likely only mean that email already exist
        //in a case where it is something different, every error will be printed to console
        console.warn(e);
        //if no error happens, the message propertie will not exist,
        //and the message propertie is set in frontend to display the message to user 
        res.status(403).send({message: 'Email already exist'})
    });
})

//login endpoint
router.post('/Auth/login', async (req,res) => {


    //checkUser() function from Authentication.js
    checkUser(req.body)
    .then((user) => {
        
        //generating an accesstoken, accesstoken will always only be 15 min,
        //therefor does not need additional configuration
        const accessToken = generateAccessToken(user);

        //default will be null
        let expire = null;
     
        //cookie settings
        //since refresh can expire after 1 day by default or 90 days if rememberMe is true
        //additionaly function to ensure user is asked after 90 days, whether to still remember user, can be defined
        //if rememberMe is true  
        if(req.body.rememberMe === true){
            
            //this cookie will, expire after 10years, 
            //refresh token can also have a long expiration, but is not the best solution
            //it will be better to occasionally ask user to login again to ensure it is the rigth user
            res.cookie('rememberMe',true, {maxAge:  86400000 * 400 * 10})
            refreshCookieOptions.maxAge = 86400000 * 90; //valid for 90 days
            expire = '90d'
        } 
        else{
            res.cookie('rememberMe',false, {maxAge: 86400000 * 90})
            refreshCookieOptions.maxAge = 86400000 * 1; //valid for a day
        }
       
        //unless expire is set, it will be the default null that was defined in the top of scope
        const refreshToken = generateRefreshToken(user, expire);

        res.cookie('_accessToken', {token:accessToken}, accessCookieOptions);
        res.cookie('_refreshToken', {token:refreshToken}, refreshCookieOptions);

        res.status(201).send({user: user})

       
    })
    .catch((e) => res.status(403).send({message: e.message})); 
})

//forgot password endpoint
router.post('/Auth/forgot', (req,res)=>{
    
    //this will first check if user exist, alot of errors will occure if user does not exists
    checkUser({email: req.body.email, password: null})
    .then((result) => { 
        //as long as user exists, and password is null, no error will occure and the promise will return the user object
        mailService({
            to: result.email,
            name: result.name,
            type: 'forgot_password'
        })
        res.status(201).send({success: 'Email sent successfully'})
     })
    .catch((err) => {
        res.status(403).send({fail: err.message})
    })
})


router.post('/Auth/admin', (req,res) => {
    
   const admin = req.body;


    if(admin.email === 'admin@svelteshop.dk'){
        if(admin.password === 'admin'){
            const accessToken = generateAccessToken({name: 'Admin', email: 'Admin@svelteshop.dk'});
            const refreshToken = generateRefreshToken({name: 'Admin', email: 'Admin@svelteshop.dk'}, null);
    
            res.cookie('_accessToken', {token:accessToken}, accessCookieOptions);
            res.cookie('_refreshToken', {token:refreshToken}, refreshCookieOptions);
    
            res.status(201).send({admin: {name: 'Admin', email: 'Admin@svelteshop.dk'}})
        }
        else res.send({message: 'admin password wrong'})
    }
    else res.send({message: 'admin email wrong'})
})


export default router;
