import BookDetails from "../BookDetails/BookDetails";
import BookAbout from "../BookAbout/BookAbout";
import "./BookDescription.css";

export default function BookDescription() {
  return (
    <div className="description-container">
      <h1>Book title</h1>
      <BookDetails></BookDetails>
      <button className="book_button">Хочу читати!</button>
      <BookAbout></BookAbout>
    </div>
  );
}
