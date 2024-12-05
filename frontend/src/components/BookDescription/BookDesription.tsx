import BookDetails from "../BookDetails/BookDetails";
import BookAbout from "../BookAbout/BookAbout";
import { increaseBookRate } from "../../services/booksService";
import "./BookDescription.css";
import { useLocation } from "react-router-dom";

export default function BookDescription(): JSX.Element {
  const location = useLocation();
  const { title, authorNames, year, bookId } = location.state || {};

  const handleClick = (): void => {
    increaseBookRate(bookId, { rate: "clicks" });
  };
  // console.log(bookId, "bookId");

  return (
    <div className="description-container">
      <h1>{title}</h1>
      <BookDetails authorNames={authorNames} year={year}></BookDetails>
      <button onClick={handleClick} className="book_button">
        Хочу читати!
      </button>
      <BookAbout></BookAbout>
    </div>
  );
}
