import mongoose from 'mongoose';

//mongoose Schema, that is the schema for the model that is to be saved in db,
//it would be Model in MVC 
const bookSchema = mongoose.Schema({
    Title: {
        type: String,
        required: true,
        unique: true
    },
    coverImg:{
        type: String, 
        required: true,
    },
    Author: {
        type: String,
        required: true,
    },
    snippet:{
        type: String
    }

}, { timestamps: true})

const Book = mongoose.model('Book', bookSchema);

export default Book;