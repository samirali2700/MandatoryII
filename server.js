//setting up dotenv
import dotenv from 'dotenv';
dotenv.config();

//imports
import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import mongoose from 'mongoose';


//instantiating app
const app = express();

//bodyparsing
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended:false}));

//setting svelte project as frontend
app.use(express.static(path.resolve('./Client/public')));

//Authentication routes
import router  from './server/Authentication/AuthenticationRoutes.js';
app.use(router);


//redirecting everything to /, all routes are set in svelte anyway
app.use('/*', (req,res) => {
    res.redirect('/')
})

//connecting to mongodb, the URI is set inside .env, since it containse sensitive info.
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true})
.then(db =>  {
    console.log(`Connected to DB`);
    //first when db is connect will the app.listen() be called, that is to ensure that access to db is available before access to frontend
    const server = app.listen(process.env.PORT, () => console.log(`Server running on port ${server.address().port}`));
})
.catch((e) => console.warn(`Failed to connect to DB: ${e}`))


