import type { Connection } from 'mysql2/promise';

import { logger } from '../config/logger';
import { getBooksWithAuthorsFromDb, getTotalBooksCount } from '../models/book.model';

const getBooks = async (offset: string, connection: Connection) => {
  try {
    const books = await getBooksWithAuthorsFromDb(offset, connection);
    const totalBooksCount = await getTotalBooksCount(connection)

    return { books, totalBooksCount }
  } catch (error) {
    logger.error({ message: 'Error while fetching books: ', error });
    throw error;
  }
};

export { getBooks }
