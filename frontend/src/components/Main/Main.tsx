import { useEffect, useState } from "react";
import BookPreview from "../BookPreview/BookPreview";
import { getBooks } from "../../services/booksService";
import NavigationPanel from "../NavigationPanel/NavigationPanel";
import IMain from "../../interfaces/IMain";
import "./Main.css";
import IBookData from "../../interfaces/IBookData";

const INITIAL_OFFSET = 20;

export default function Main({
  setIsBookOpen,
  setBookData,
}: IMain): JSX.Element {
  const [booksData, setBooksData] = useState<IBookData[]>([]);
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
      bookData={item}
      setBookData={setBookData}
      setIsBookOpen={setIsBookOpen}
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
