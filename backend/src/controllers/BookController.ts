import { Request, Response } from 'express';
import {
  getBooksWithAuthorsFromDb,
  deleteBookFromDb,
  increaseClicksInDb,
  increaseViewsInDb,
  addBookToDb,
  getTotalBooksCount,
  searchBooksInDb,
} from '../models/BookModel';
import { Connection } from 'mysql2/promise';

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
  } catch (error) {
    console.error('error during sending books: ', error);
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
  } catch (error) {
    console.error('error during deleting books: ', error);
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

    res.status(200).json({ message: `Deleted succesfully! Id: ${bookId}` });
  } catch (error) {
    console.error('Error during increasing click rate: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const addBook = async (req: Request, res: Response, connection: Connection) => {
  try {
    const bookData = req.body;

    addBookToDb(
      { ...bookData, authorNames: bookData.authorNames.split(',') },
      connection
    );
  } catch (error) {
    console.error('Error during adding a new book: ', error);
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
  } catch (error) {}
};

export { getBooks, deleteBook, increaseBookRate, addBook, searchBooks };
