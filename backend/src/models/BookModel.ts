import { Connection } from 'mysql2/promise';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

interface BookWithAuthor extends RowDataPacket {
  bookId: string;
  title: string;
  year: string;
  clicks: number;
  viewsCount: number;
  authorNames: string;
}

const getBooksWithAuthorsFromDb = async (
  limit: string | number,
  connection: Connection
) => {
  // If we want to get all the data
  const isMax = limit === 'max';

  const [rows] = await connection.query<BookWithAuthor[]>(
    `
      SELECT
        books.id AS bookId,
        books.title,
        books.year,
        books.clicks_count AS clicks,
        books.views_count AS viewsCount,
        GROUP_CONCAT(authors.name SEPARATOR ', ') AS authorNames
    FROM books
    LEFT JOIN book_authors ON books.id = book_authors.book_id
    LEFT JOIN authors ON authors.id = book_authors.author_id
    WHERE books.is_deleted = FALSE
    GROUP BY books.id, books.title, books.year, books.clicks_count, books.views_count
    ${isMax ? '' : 'LIMIT ?'}
    ;
  `,
    [Number(limit)]
  );

  return rows;
};

const getTotalBooksCount = async (connection: Connection): Promise<number> => {
  const [rows] = await connection.query(
    `SELECT COUNT(*) AS totalBooks FROM books WHERE is_deleted = FALSE;`
  );

  const totalBooks = (rows as [{ totalBooks: number }])[0].totalBooks;

  return totalBooks;
};

const deleteBookFromDb = async (bookId: number, connection: Connection) => {
  await connection.query(`UPDATE books SET is_deleted = TRUE WHERE id = ?`, [
    bookId,
  ]);
};

// Increase clicks field in db to show rate of a book on admins page
const increaseClicksInDb = async (bookId: number, connection: Connection) => {
  await connection.query(
    `UPDATE books SET clicks_count = clicks_count + 1 WHERE id = ?`,
    [bookId]
  );
};

// Increase view field in db to show rate of a book on admins page
const increaseViewsInDb = async (bookId: number, connection: Connection) => {
  await connection.query(
    `UPDATE books SET views_count = views_count + 1 WHERE id = ?`,
    [bookId]
  );
};

const addBookToDb = async (
  bookData: {
    title: string;
    year: string;
    authorNames: string[];
  },
  connection: Connection
) => {
  try {
    // Adds book
    const [bookResult] = await connection.query<ResultSetHeader>(
      `
      INSERT INTO books (title, year) 
      VALUES (?, ?)
    `,
      [bookData.title, bookData.year]
    );

    const bookId = bookResult.insertId;

    // Check if there is an author from received authorNames in db
    for (const authorName of bookData.authorNames) {
      const [authorResult] = await connection.query<RowDataPacket[]>(
        `
        SELECT id FROM authors WHERE name = ?
      `,
        [authorName]
      );

      let authorId;

      if (authorResult.length > 0) {
        // Take id of existing author
        authorId = authorResult[0].id;
      } else {
        // Create a new author
        const [insertAuthorResult] = await connection.query<ResultSetHeader>(
          `
          INSERT INTO authors (name) 
          VALUES (?)
        `,
          [authorName]
        );
        authorId = insertAuthorResult.insertId;
      }

      // 3. Set connection between book and author
      await connection.query(
        `
        INSERT INTO book_authors (book_id, author_id) 
        VALUES (?, ?)
      `,
        [bookId, authorId]
      );
    }
  } catch (error) {
    console.error('Error while adding book and authors: ', error);
  }
};

// Find book using auhtor or title
const searchBooksInDb = async (search: string, connection: Connection) => {
  const searchPattern = `%${search}%`;

  const [rows] = await connection.query(
    `
      SELECT
        books.id AS bookId,
        books.title,
        books.year,
        books.clicks_count AS clicks,
        books.views_count AS viewsCount,
        GROUP_CONCAT(authors.name SEPARATOR ', ') AS authorNames
      FROM books
      LEFT JOIN book_authors ON books.id = book_authors.book_id
      LEFT JOIN authors ON authors.id = book_authors.author_id
      WHERE books.is_deleted = FALSE 
        AND (books.title LIKE ? OR authors.name LIKE ?)
      GROUP BY books.id, books.title, books.year, books.clicks_count, books.views_count;
    `,
    [searchPattern, searchPattern]
  );

  return rows;
};

export {
  getBooksWithAuthorsFromDb,
  deleteBookFromDb,
  increaseClicksInDb,
  increaseViewsInDb,
  addBookToDb,
  getTotalBooksCount,
  searchBooksInDb,
};
