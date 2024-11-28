import createConnection from '../config/database';

const getBooksWithAuthorsFromDb = async () => {
  const connection = await createConnection();

  const [rows] = await connection.query(
    `SELECT books.id AS book_id, books.title, authors.id AS author_id, authors.name AS author_name
      FROM books
      LEFT JOIN book_authors ON books.id = book_authors.book_id
      LEFT JOIN authors ON authors.id = book_authors.author_id
      WHERE books.is_deleted = FALSE`
  );

  connection.end();
  return rows;
};

const deleteBookFromDb = async (bookId: number) => {
  const connection = await createConnection();

  const [result] = await connection.query(`DELETE FROM books WHERE id = ?`, [
    bookId,
  ]);

  console.log(result);

  connection.end();
  return result;
};

export { getBooksWithAuthorsFromDb, deleteBookFromDb };
