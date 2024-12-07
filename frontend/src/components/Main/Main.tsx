import { useEffect, useState } from "react";
import IBookPreview from "../../interfaces/IBookPreview";
import BookPreview from "../BookPreview/BookPreview";
import { getBooks } from "../../services/booksService";
import NavigationPanel from "../NavigationPanel/NavigationPanel";
import "./Main.css";

const INITIAL_OFFSET = 20;

export default function Main(): JSX.Element {
  const [booksData, setBooksData] = useState<IBookPreview[]>([]);
  const [totalBooksCount, setTotalBooksCount] = useState<number>(0);
  const [offset, setOffset] = useState<number>(INITIAL_OFFSET);

  useEffect(() => {
    const fetchBooks = async () => {
      const { books, totalBooksCount } = await getBooks({ offset });
      setBooksData(books);
      setTotalBooksCount(totalBooksCount);
    };

    fetchBooks();
  }, [offset]);

  const bookPreviews = booksData.map((item) => (
    <BookPreview
      key={item.bookId}
      authorNames={item.authorNames}
      title={item.title}
      year={item.year}
      bookId={item.bookId}
    ></BookPreview>
  ));

  return (
    <main className="library-main">
      <div className="book-previews-container">{bookPreviews}</div>
      <NavigationPanel
        totalBooksCount={totalBooksCount}
        displayedBooksCount={offset}
        setOffset={setOffset}
      />
    </main>
  );
}
