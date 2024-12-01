import { useState, useEffect } from "react";
import IBookPreview from "../../interfaces/IBookPreview";
import { deleteBook, getBooks } from "../../services/booksService";
import "./Admin.css";

const fetchBooks = async (
  setBooksData: React.Dispatch<React.SetStateAction<IBookPreview[]>>,
  setTablePages: React.Dispatch<React.SetStateAction<number[]>>
) => {
  const books = await getBooks();
  setBooksData(books);

  const totalPages = Math.ceil(books.length / 5);

  // Makes an array of numbers to represent table pages
  setTablePages(Array.from({ length: totalPages }, (_, index) => index + 1));
};

export default function Admin(): JSX.Element {
  const [booksData, setBooksData] = useState<IBookPreview[]>([]);
  const [tablePages, setTablePages] = useState<number[]>([]);
  const [openTablePage, setOpenTablePage] = useState<number>(1);

  useEffect(() => {
    fetchBooks(setBooksData, setTablePages);
  }, []);

  const booksElements = booksData.map((item, index) => {
    const firstItemIndex = (openTablePage - 1) * 5;
    const lastItemIndex = openTablePage * 5;

    if (index < firstItemIndex || index >= lastItemIndex) {
      return;
    }

    return (
      <tr key={item.bookId}>
        <td>{item.title}</td>
        <td>{item.authorNames}</td>
        <td>{item.year}</td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(item.bookId)}
          >
            Видалити
          </button>
        </td>
        <td>{item.clicks}</td>
      </tr>
    );
  });

  const handleDelete = async (bookId: number | undefined): Promise<void> => {
    if (bookId) {
      await deleteBook(bookId);
      fetchBooks(setBooksData, setTablePages);
    }
  };

  const handleClick = (activePage: number): void => {
    setOpenTablePage(activePage);
  };

  const pageNumbers = tablePages.map((_, index) => (
    <p key={index} onClick={() => handleClick(index + 1)}>
      {index + 1}
    </p>
  ));

  return (
    <div className="d-flex justify-content-between">
      <div className="admin-page p-4 border border-primary rounded w-30 admin-table">
        <h3>Список книг</h3>
        <div className="books-elements-container">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Назва книги</th>
                <th>Автори</th>
                <th>Рік</th>
                <th>Дії</th>
                <th>Кліки</th>
              </tr>
            </thead>
            <tbody>{booksElements}</tbody>
          </table>
          <div className="page-numbers-container">{pageNumbers}</div>
        </div>
      </div>

      <div className="admin-page p-4 border border-primary rounded w-50">
        <h2>Додати книгу</h2>
        <form className="container mt-4">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="bookTitle" className="form-label">
                Назва книги
              </label>
              <input
                type="text"
                className="form-control"
                id="bookTitle"
                placeholder="Введіть назву книги"
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="publicationYear" className="form-label">
                Рік видання
              </label>
              <input
                type="number"
                className="form-control"
                id="publicationYear"
                placeholder="Введіть рік видання"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 mb-3">
              <label htmlFor="author1" className="form-label">
                Автор 1
              </label>
              <input
                type="text"
                className="form-control"
                id="author1"
                placeholder="Введіть ім'я першого автора"
              />
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="author2" className="form-label">
                Автор 2
              </label>
              <input
                type="text"
                className="form-control"
                id="author2"
                placeholder="Введіть ім'я другого автора"
              />
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="author3" className="form-label">
                Автор 3
              </label>
              <input
                type="text"
                className="form-control"
                id="author3"
                placeholder="Введіть ім'я третього автора"
              />
            </div>
          </div>

          <div className="row file-container">
            <div className="col-md-6 mb-3">
              <label htmlFor="bookImage" className="form-label">
                Завантажити зображення книги
              </label>
              <input
                type="file"
                className="form-control form-control-lg file-input"
                id="bookImage"
                accept="image/*"
              />
            </div>

            <div className="col-md-6 mb-3 d-flex align-items-end">
              <button type="submit" className="btn btn-primary w-100">
                Додати
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
