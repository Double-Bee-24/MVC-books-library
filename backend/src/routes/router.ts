import express from 'express';
import {
  getBooks,
  increaseBookRate,
  searchBooks,
} from '../controllers/BookController';
import { login, logout } from '../controllers/AuthController';

const router = express.Router();

// Books
router.get('/books', getBooks);
router.put('/books/:bookId', increaseBookRate);
router.get('/books/search', searchBooks);

// Authorization
router.post('/login', login);
router.post('/logout', logout);

export { router };
