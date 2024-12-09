// import { useState } from "react";
import "./BookPreview.css";
import IBookPreview from "../../interfaces/IBookPreview";
import { increaseBookRate } from "../../services/booksService";

export default function BookPreview({
  bookData,
  setIsBookOpen,
  setBookData,
}: IBookPreview): JSX.Element {
  const handleClick = (): void => {
    if (bookData.bookId) {
      increaseBookRate(bookData.bookId, { rate: "views" });
    }
    // navigate("/book", { state: { title, authorNames, year, bookId } });
    if (setBookData) {
      setBookData(bookData);
    }
    if (setIsBookOpen) {
      setIsBookOpen(true);
      console.log("loging");
    }
  };

  return (
    <div className="book-preview" onClick={handleClick}>
      <img
        src="/assets/images/untitled_book.jpg"
        alt="книжкова обкладинка"
        className="book-preview_cover"
      />
      <p>{bookData.title}</p>
      <p>{bookData.authorNames}</p>
      <button>Читати</button>
    </div>
  );
}
