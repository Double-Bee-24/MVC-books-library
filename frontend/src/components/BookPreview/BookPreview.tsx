// import { useState } from "react";
import "./BookPreview.css";
import IBookPreview from "../../interfaces/IBookPreview";
import { useNavigate } from "react-router-dom";
import { increaseBookRate } from "../../services/booksService";

export default function BookPreview({
  title,
  authorNames,
  year,
  bookId,
}: IBookPreview): JSX.Element {
  const navigate = useNavigate();

  const handleClick = (): void => {
    if (bookId) {
      increaseBookRate(bookId, { rate: "views" });
    }
    navigate("/book", { state: { title, authorNames, year, bookId } });
  };

  return (
    <div className="book-preview" onClick={handleClick}>
      <img
        src="/assets/images/untitled_book.jpg"
        alt="книжкова обкладинка"
        className="book-preview_cover"
      />
      <p>{title}</p>
      <p>{authorNames}</p>
      <button>Читати</button>
    </div>
  );
}
