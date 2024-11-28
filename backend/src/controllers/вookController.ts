import express, { Request, Response } from 'express';
import {
  getBooksWithAuthorsFromDb,
  deleteBookFromDb,
} from '../models/BookModel';

// TODO: Shoud be reconsidered
// router.get('/book/:id', async (req, res) => {
//   console.log('Something is happening');
//   try {
//     const bookId = req.params.id;
//     console.log(bookId);

//     const filePath = path.resolve(
//       __dirname,
//       '../../public/book-page/book-page.html'
//     );

//     res.sendFile(filePath);
//   } catch (error) {
//     console.error('Erorr trying to get book: ', error);
//     res.status(500).json({ error: 'Server internal error' });
//   }
// });

const getBooks = async (req: Request, res: Response) => {
  try {
    const rows = await getBooksWithAuthorsFromDb();

    res.status(200).send(rows);
  } catch (error) {
    console.error('error during sending books: ', error);
    res.status(500).json({ error: 'internal server error' });
  }
};

const deleteBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    console.log(bookId);

    const rows = await deleteBookFromDb(Number(bookId));

    res.status(200).send(rows);
  } catch (error) {
    console.error('error during deleting books: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { getBooks, deleteBook };
