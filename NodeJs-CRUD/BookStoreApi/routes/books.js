import express from "express";
import Books from "../models/books.js";
import validateBook from "../middlewares/bookValidation.js";
import { 
        createBook, 
        getAllBooks, 
        getBookById, 
        updateBook, 
        deleteBook 
    } from "../controllers/books.js";  

const router = express.Router();

router.post('/books', validateBook, createBook);

router.get('/books', getAllBooks);

router.get('/books/:id', getBookById);

router.put('/books/:id', validateBook, updateBook);

router.delete('/books/:id', deleteBook);

export default router;
