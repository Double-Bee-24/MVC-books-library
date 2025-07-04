import express, { Router } from 'express';
import { Connection } from 'mysql2/promise';

import { login, updateToken } from '../controllers/AuthController';
import {
  getBooks,
  increaseBookRate,
  searchBooks,
} from '../controllers/BookController';

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
