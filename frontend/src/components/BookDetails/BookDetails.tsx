import IBookDetails from "../../interfaces/IBookDetails";
import "./BookDetails.css";

export default function BookDetails({ authorNames, year }: IBookDetails) {
  return (
    <div className="book-details">
      <p>
        <strong>Автор:</strong> {authorNames}
      </p>
      <p>
        <strong>Рік:</strong> {year}
      </p>
      <p>
        <strong>Сторінок:</strong> 325
      </p>
      {/* <p>
        <strong>ISBN:</strong> хто зна
      </p> */}
    </div>
  );
}
