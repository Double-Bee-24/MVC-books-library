import IFoundBooksMain from "../../interfaces/IFoundBooksMain";
import BookPreview from "../BookPreview/BookPreview";
import "./FoundBooksMain.css";

export default function FoundBooksMain({
  booksData,
  setIsBookOpen,
}: IFoundBooksMain): JSX.Element {
  const bookPreviews = booksData.map((item) => (
    <BookPreview
      key={item.bookId}
      bookData={item}
      setIsBookOpen={setIsBookOpen}
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
