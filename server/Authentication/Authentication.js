import jwt    from 'jsonwebtoken'; 
import { insertToken, getToken, rmToken } from '../Database/tokenDB.js';
import bcrypt from 'bcrypt';
import User from '../Database/Schema/User.js';

//Temp refreshToken holder
let refreshTokens = [];


/*
    All function in this file will only be authentication functions,
    meaning checking, verifying, generating token,  also saving a user
    they will also all return a promise, in this way, erro can be easily handled

*/ 

//saveUser() to db takes a user object in as parameter
export function saveUser(user){
    return new Promise( async (resolve, reject) => {

        //first thing is to hash the password, this is done with bcrypt.hash()
        //first arg, is password
        //second arg, is salt, default complexsity is 12, any higher wil take longer

        user.password = await bcrypt.hash(user.password, 12);

        //a newUser object is initialized with User model,
        //takes in a user object, wich has name, email and password
        const newUser = new User(user);
        
        //since it is Instance of User model, the method save can be used to save to DB
        //using a callback function instead of .then, makes the code cleaner
        //the function returns err and result
        newUser.save(function(err, result){
            //first arg, is error, as long as there is no error, 
            //the reject will not be run
            if(err) {reject(err)}
            
            //if the promise is not rejected, the promise will be resolved and return the result
            //wich is user object with _id, and other properties 
            resolve(result)
        })       
    })
}

//checkUser() will check db to find user, this function will be called from /login endpoint
export function checkUser(user){
    return new Promise( async (resolve, reject) => {

        //becuase a user logges in  with email and password, the id og that user is stille unknown
        //therefore the method findOne(), will be used instead of findById()
        //this method takes in one or multiple properties,
        //the properties must be corresponding to fields in that are used in the DB model
        User.findOne({email: user.email},  async function(err, result){
         
            if(err){ reject({error: err})}

            //if not rejected, meaning that user email exists
            //the password will be compare to the the hashed one in db with bcrypt.compare() method
            //the method will return a boolean value
       
            if(result){
                if(user.password){
                    const passMatch = await bcrypt.compare(user.password, result.password);

                    if(!passMatch){
                        //if passMatch is false this means, 
                        //that means that the input password and the hashed password doest NOT match
                        reject({message:'Incorrect password'})
                    }
                }
                //
                
                //if not reject so far, that means that everything is in order, and the promise can be resolved
                resolve({
                        id: result._id,
                        name: result.name,
                        email: result.email
                })
            }
            else reject({message: 'Email not found'})
        })
    })
}


/*****  Token Functions     */
//verifyToken() function, is as name implies it will verify the reseived tokens
//becuase this method will be used to verify both access and refresh token,
//the token and secret will be set when calling this method
export const verifyToken = (token, secret) => {
    return new Promise((resolve,reject) => {

        //the jwt verify() method takes two args,
        //first arg, is the token
        //second arg, is the secret that is stored in .env
        //third arg, is a callback function with two params, 
        //first is err, second is user or user info that is stored inside token
        jwt.verify(token, secret, (err, user) => {


            //reject incase of error, error can most likely only mean that token has been modified, 
            //or is no longer valide, meaning it hase expired
            //Note: token expiration has nothing to do with cookies expiration
            //token can expire before cookie and vice versa, 
            //therefor they should expire same time, but no biggie if they don't
            //since this will be the precaution to such cases   
            if(err) reject(err);

            //to ensure that the user which tokens belongs to exist
            //findById() method will be called 
            User.findById(user.id)
            .then((data) => {
                //if no error the promise will be resolve
                resolve({
                    id: data._id,
                    name: data.name,
                    email: data.email
                });
            }) //else if it catch an error it will be rejected
            .catch((e) => reject(e))
            
        })
    })
}

//generateAccessToken() will only take a user object in as params
export const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15min'});
}
//generateRefreshToken(), additionaly to user object it will also take an expires params
export const generateRefreshToken = (user, expires) => {
    let expire;

    //if expires is not null, that will mean that it should not be the default '1d' expiration
    //and the expire variable will be defined to wheterever expires is 
    if(expires!==null) expire = expires;

    //else default expire will be defined to '1d'
    else expire = '1d'
    //the token is generated with an expiration options
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: expire})
}
