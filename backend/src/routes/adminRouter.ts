import express, { Router } from 'express';
import { deleteBook, addBook } from '../controllers/BookController';
import authenticationMiddleware from '../middlewares/authenticationMiddleware';
import { Connection } from 'mysql2/promise';

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
