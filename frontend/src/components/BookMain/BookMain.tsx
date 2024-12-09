import IBookMain from "../../interfaces/IBookMain";
import BookDescription from "../BookDescription/BookDesription";
import "./BookMain.css";

export default function BookMain({ bookData }: IBookMain) {
  return (
    <main className="book-main">
      <img src="/assets/images/untitled_book.jpg" alt="обкладинка книжки" />
      <BookDescription bookData={bookData} />
    </main>
  );
}
