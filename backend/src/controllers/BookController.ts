import { Request, Response } from 'express';
import {
  getBooksWithAuthorsFromDb,
  deleteBookFromDb,
  increaseClicksInDb,
  increaseViewsInDb,
  addBookToDb,
} from '../models/BookModel';

const getBooks = async (req: Request, res: Response) => {
  try {
    const rows = await getBooksWithAuthorsFromDb();

    res.status(200).send(rows);
  } catch (error) {
    console.error('error during sending books: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;

    await deleteBookFromDb(Number(bookId));

    res.status(200).json({ message: `Deleted succesfully! Id: ${bookId}` });
  } catch (error) {
    console.error('error during deleting books: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const increaseBookRate = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const { rate } = req.body;

    if (rate === 'clicks') {
      await increaseClicksInDb(Number(bookId));
    }

    if (rate === 'views') {
      await increaseViewsInDb(Number(bookId));
    }

    res.status(200).json({ message: `Deleted succesfully! Id: ${bookId}` });
  } catch (error) {
    console.error('Error during increasing click rate: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const addBook = async (req: Request, res: Response) => {
  try {
    const bookData = req.body;
    console.log(bookData, 'bookData');

    addBookToDb({ ...bookData, authorNames: bookData.authorNames.split(',') });
  } catch (error) {
    console.error('Error during adding a new book: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { getBooks, deleteBook, increaseBookRate, addBook };
