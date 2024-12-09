import BookDetails from "../BookDetails/BookDetails";
import BookAbout from "../BookAbout/BookAbout";
import BookInfoModal from "../BookInfoModal/BookInfoModal";
import { increaseBookRate } from "../../services/booksService";
import { useState } from "react";
import IBookDescription from "../../interfaces/IBookDescription";
import "./BookDescription.css";

export default function BookDescription({
  bookData,
}: IBookDescription): JSX.Element {
  const { bookId, title, authorNames, year } = bookData;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleClick = (): void => {
    increaseBookRate(bookId, { rate: "clicks" });
    setIsModalOpen(true);
  };

  return (
    <div className="description-container">
      <h1>{title}</h1>
      <BookDetails authorNames={authorNames} year={year}></BookDetails>
      <button onClick={handleClick} className="book_button">
        Хочу читати!
      </button>
      <BookAbout></BookAbout>
      {isModalOpen && (
        <BookInfoModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
}
