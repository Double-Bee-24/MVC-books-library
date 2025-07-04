import type { Router } from 'express';
import express from 'express';
import type { Connection } from 'mysql2/promise';

import { deleteBook, addBook } from '../controllers/BookController';
import authenticationMiddleware from '../middlewares/authenticationMiddleware';

const createAdminRouter = (connection: Connection): Router => {
  const adminRouter = express.Router();

  adminRouter.use(authenticationMiddleware);

  adminRouter.delete('/books/:bookId', (req, res) =>
    deleteBook(req, res, connection)
  );
  adminRouter.post('/books', (req, res) => addBook(req, res, connection));

  return adminRouter;
};

export { createAdminRouter };
