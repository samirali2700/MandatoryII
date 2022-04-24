import Book from "../Database/Schema/Book.js";
import { Router } from "express";



const bookRouter = Router();



bookRouter.get('/api/books', (req, res) => {
    Book.find().sort({createdAt: -1 })
    .then((result => res.status(201).send(result)))
    .catch((err) => res.status(403).send(err))

})
bookRouter.get('/api/book',  (req,res) => {
    const id = req.query.id;

    Book.findById(id, function(err, result){
        if(err) res.status(403).send(err)
        else res.status(201).send(result);
    })
})

bookRouter.post('/api/book', (req,res) => {
    const book = new Book(req.body);

    book.save(function(err){
        if(err) res.status(403).send(err);
        else res.status(201).send('All Good')
    })
})
bookRouter.delete('/api/book', (req,res) => {
    const id = req.query.id;

    Book.findByIdAndDelete(id, function(err, result){
        if(err) res.status(403).send(err)
        else res.status(201).send(result);
    })
})


export default bookRouter;