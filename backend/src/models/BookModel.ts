import createConnection from '../config/database';

const getBooksWithAuthorsFromDb = async () => {
  const connection = await createConnection();

  const [rows] = await connection.query(`
    SELECT 
        books.id AS bookId, 
        books.title, 
        books.year, 
        books.clicks_count AS clicks,
        GROUP_CONCAT(authors.name SEPARATOR ', ') AS authorNames
    FROM books
    LEFT JOIN book_authors ON books.id = book_authors.book_id
    LEFT JOIN authors ON authors.id = book_authors.author_id
    WHERE books.is_deleted = FALSE
    GROUP BY books.id;
  `);

  connection.end();
  return rows;
};

const deleteBookFromDb = async (bookId: number) => {
  const connection = await createConnection();

  await connection.query(`UPDATE books SET is_deleted = TRUE WHERE id = ?`, [
    bookId,
  ]);

  connection.end();
};

export { getBooksWithAuthorsFromDb, deleteBookFromDb };
