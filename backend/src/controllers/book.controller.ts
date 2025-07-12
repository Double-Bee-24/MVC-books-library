import type { Request, Response } from 'express';
import type { Connection } from 'mysql2/promise';

import { logger } from '../config/logger';
import {
  getBooksWithAuthorsFromDb,
  deleteBookFromDb,
  increaseClicksInDb,
  increaseViewsInDb,
  addBookToDb,
  getTotalBooksCount,
  searchBooksInDb,
} from '../models/book.model';

const getBooks = async (
  req: Request,
  res: Response,
  connection: Connection
) => {
  try {
    const { offset } = req.query;

    if (typeof offset !== 'string' && typeof offset !== 'number') {
      res.status(400).json({ error: 'Incorrect data type' });
      return;
    }
    const books = await getBooksWithAuthorsFromDb(offset, connection);
    const totalBooksCount = await getTotalBooksCount(connection);

    res.status(200).json({ books, totalBooksCount });
  } catch (err) {
    logger.error({ message: 'Error during sending books: ', err });
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteBook = async (
  req: Request,
  res: Response,
  connection: Connection
) => {
  try {
    const { bookId } = req.params;

    await deleteBookFromDb(Number(bookId), connection);

    res.status(200).json({ message: `Deleted succesfully! Id: ${bookId}` });
  } catch (err) {
    logger.error({ message: 'Error during deleting books: ', err });
    res.status(500).json({ error: 'Internal server error' });
  }
};

const increaseBookRate = async (
  req: Request,
  res: Response,
  connection: Connection
) => {
  try {
    const { bookId } = req.params;
    const { rate } = req.body;

    if (rate === 'clicks') {
      await increaseClicksInDb(Number(bookId), connection);
    }

    if (rate === 'views') {
      await increaseViewsInDb(Number(bookId), connection);
    }

    res.status(200).json({ message: `Book rate increased: ${bookId}` });
  } catch (err) {
    logger.error({ message: 'Error during increasing click rate: ', err });
    res.status(500).json({ error: 'Internal server error' });
  }
};

const addBook = async (req: Request, res: Response, connection: Connection) => {
  try {
    const bookData = req.body;

    await addBookToDb(
      { ...bookData, authorNames: bookData.authorNames.split(',') },
      connection
    );
  } catch (err) {
    logger.error({ message: 'Error during adding a new book: ', err });
    res.status(500).json({ error: 'Internal server error' });
  }
};

const searchBooks = async (
  req: Request,
  res: Response,
  connection: Connection
) => {
  try {
    const { searchString } = req.query;

    if (typeof searchString !== 'string') {
      res.status(400).json({ error: 'search string should be a string type' });
      return;
    }

    const foundBooks = await searchBooksInDb(searchString, connection);

    res.status(200).json(foundBooks);
  } catch (err) {
    logger.error({ message: 'Error during searching books:', err });
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { getBooks, deleteBook, increaseBookRate, addBook, searchBooks };
