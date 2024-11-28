import express from 'express';
import { getBooks, deleteBook } from '../controllers/вookController';
import { login, logout } from '../controllers/authController';

const router = express.Router();

router.get('/books', getBooks);
router.delete('/books/:bookId', deleteBook);

router.post('/login', login);
router.post('/logout', logout);

export { router };
