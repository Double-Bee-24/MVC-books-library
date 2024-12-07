import express from 'express';
import { deleteBook, addBook } from '../controllers/BookController';
import authenticationMiddleware from '../middlewares/authenticationMiddleware';

const adminRouter = express.Router();
adminRouter.use(authenticationMiddleware);

adminRouter.delete('/books/:bookId', deleteBook);
adminRouter.post('/books', addBook);

export { adminRouter };
