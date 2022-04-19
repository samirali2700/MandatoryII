import mongoose from 'mongoose';

//mongoose Schema, that is the schema for the model that is to be saved in db,
//it will be Model in MVC 
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 8
    }

}, { timestamps: true})

const User = mongoose.model('User', userSchema);

export default User;