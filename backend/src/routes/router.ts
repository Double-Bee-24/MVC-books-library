import express, { Response, Router } from 'express';
import {
  getBooks,
  increaseBookRate,
  searchBooks,
} from '../controllers/BookController';
import { login, updateToken } from '../controllers/AuthController';
import { Connection } from 'mysql2/promise';

const createRouter = (connection: Connection): Router => {
  const router = express.Router();

  // Books
  router.get('/books', (req, res) => getBooks(req, res, connection));
  router.put('/books/:bookId', (req, res) =>
    increaseBookRate(req, res, connection)
  );
  router.get('/books/search', (req, res) => searchBooks(req, res, connection));

  // Authorization
  router.post('/login', (req, res) => login(req, res, connection));
  router.post('/refresh', (req, res) => updateToken(req, res, connection));

  return router;
};

export { createRouter };
