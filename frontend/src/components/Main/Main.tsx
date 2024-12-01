import { useEffect, useState } from "react";
import IBookPreview from "../../interfaces/IBookPreview";
import BookPreview from "../BookPreview/BookPreview";
import { getBooks } from "../../services/booksService";
import "./Main.css";

export default function Main(): JSX.Element {
  const [booksData, setBooksData] = useState<IBookPreview[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const books = await getBooks();
      setBooksData(books);
    };

    fetchBooks();
  }, []);

  const bookPreviews = booksData.map((item) => (
    <BookPreview
      key={item.bookId}
      authorNames={item.authorNames}
      title={item.title}
    ></BookPreview>
  ));

  return <main className="library-main">{bookPreviews}</main>;
}
