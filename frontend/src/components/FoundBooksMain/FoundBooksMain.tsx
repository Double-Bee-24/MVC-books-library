import IBookPreview from "../../interfaces/IBookPreview";
import BookPreview from "../BookPreview/BookPreview";
import "./FoundBooksMain.css";

interface IFoundBooksMain {
  booksData: IBookPreview[];
}

export default function FoundBooksMain({
  booksData,
}: IFoundBooksMain): JSX.Element {
  const bookPreviews = booksData.map((item) => (
    <BookPreview
      key={item.bookId}
      authorNames={item.authorNames}
      title={item.title}
      year={item.year}
      bookId={item.bookId}
    ></BookPreview>
  ));
  return (
    <main className="found-books-main">
      <p className="found-resume">
        за вашим запитом знайдено {booksData.length} результат(ів)
      </p>
      <div className="book-previews-wrapper">{bookPreviews}</div>
    </main>
  );
}
