import nodemailer from 'nodemailer'; 
import dotenv from 'dotenv';
dotenv.config();

//transport will be used as a global varibale inside file
let transporter;

//a main function,which will intialize a tranporter object 
async function main() {

    
    transporter = nodemailer.createTransport({
        //transport options
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        /*
            since the sender will be a gmail account,
            the auth type used will be Oauth2, this is to ensure max sexurity
            this is setup is following https://www.youtube.com/watch?v=JJ44WA_eV8E with minor tweaks
        */
      auth: {
            type: "OAUTH2",
            user: process.env.GMAIL_USER, // generated ethereal user
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.GMAIL_REFRESH_TOKEN,
            accessToken: 'ya29.A0ARrdaM_Uok2gaODO4ly6NXWopqpTDT8vsh5IohDpeS_K8ftv5eJJFQxGDSw_Klzb9mWs2kqLSAxfCUKqnNYzERYMAwn2a60jxGFJd_gMPhnY_KM7T-CjaoXhP_5DkvckZf7SNRVo4sObJ1gxMtdXzO4ZXZd1'
      },
    });     
   
}

//this will be run first time the file is loaded.
main().catch(console.error);



/*
    there will only be one exported function, which takes is a data object
    the function will only be, defining values relative to som data.key values
    because it is almost a repetitive block code for each case, it would be cleaner to keep it in one function

*/
export default function mailService(data){
    //in any case, htmlBody, and subject are the only required fields to move to next step
    let htmlBody;
    let subject;

    /**
     * nodemail gives the option, to send plaintext, and html text
     * given the researche i've done, html is the better option, not only becuase the design options are plural
     * but also by testing, found out that almost all mail services, only use html 
     * one could also add the plaintext, in a case a user uses something that only acceptes plaintext
     * for this project it will be skipped
     */

    switch(data.type){
        case 'register_confirmation':
            subject = 'Confirm your account on Svelte Shop'
            htmlBody = 
            `<div style="text-align:center; border:1px solid rgba(255,255,255,0.5); border-radius:5px; margin:5px 10px; padding:15px; box-shadow: 2px 2px 2px rgba(255,255,255,0.5)">
                <h2>Hello ${data.name || 'Customer'}</h2>
                    <h3>Thank you for signing up with Us!</h3>
                    <p>To verify your email follow this <span><a href='#'>link<a/></span></p>
                    <p style="color:red;">link does not work as of yet</p>
                    <br>
                    <p style="color:#0080ff" >Svelte Shop</b></p>
            </div>`

            break;
        case 'forgot_password':
            subject = 'Reset password'
            htmlBody = 
            `<div style="text-align:center; border:1px solid rgba(255,255,255,0.5); border-radius:5px; margin:5px 10px; padding:15px; box-shadow: 2px 2px 2px rgba(255,255,255,0.5)">
                    <h3>Hi ${data.name}</h3>
                    <p>To reset your password, click the button below.</p>
                    <a href="#" style=" padding: 8px 15px; background-color:#0080ff; color: #fff; text-decoration:none; font-size:16px;">Reset password</a>
                    <p>If you did not request this, then ignore this email</p>
                    <p style="color:#0080ff" >Svelte Shop</b></p>
            </div>`
            break;
        case 'purchase_confirmation':
            subject = 'Order Confirmation';
            htmlBody = 
            `<div style="text-align:center; border:1px solid rgba(255,255,255,0.5); border-radius:5px; margin:5px 10px; padding:15px; box-shadow: 2px 2px 2px rgba(255,255,255,0.5)">
                <h2>Thank you for your purchase</h2>
                    <h3>Dear ${data.name || 'Customer'}</h3>
                    <p>Thank you for choosing to buy from us.</p>
                    <p>You will receive a confirmation when the order is sent!</p>
                    <p>If you have any questions regarding the order or the shipment, please feel free to contant us</p>
                    <br>
                    <p>With regards</p>
                    <p style="color:#0080ff" >Svelte Shop</b></p>
            </div>`
            break;
        
    }
    
    //the defined variables will be added to the data object
    data.htmlBody = htmlBody;
    data.subject = subject;

    //then the sendMail() function will be called with the data object as it's parameters
    sendMail(data);
}

/*
    this function only goal is to send the received data out
    there are no precautions as to if any data.key is wrongfully input or is missing
    in that case, it will only print out the error
    could return a promise, as to handle the error and success
*/
async function sendMail(data){

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Svelte Shop" <1505samirali@gmail.com>', // sender address
        to: data.to, // list of receivers
        subject: data.subject, // Subject line
        html: data.htmlBody, // html body
      }, function(err){
          if(err) console.log(`failed to send email: ${err}`);
          else console.log(`email sent successfully`);
      });
}