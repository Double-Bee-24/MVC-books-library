import BookDescription from "../BookDescription/BookDesription";
import "./BookMain.css";

export default function BookMain() {
  return (
    <main className="book-main">
      <img src="/assets/images/untitled_book.jpg" alt="обкладинка книжки" />
      <BookDescription />
    </main>
  );
}
