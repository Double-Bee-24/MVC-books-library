import express from 'express';
import { deleteBook, addBook } from '../controllers/BookController';

const adminRouter = express.Router();

adminRouter.delete('/books/:bookId', deleteBook);
adminRouter.post('/books', addBook);

export { adminRouter };
