// import { useState } from "react";
import "./BookPreview.css";
import IBookPreview from "../../interfaces/IBookPreview";

export default function BookPreview({
  title,
  authorNames,
}: IBookPreview): JSX.Element {
  return (
    <div className="book-preview">
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
