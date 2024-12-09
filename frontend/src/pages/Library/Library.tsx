import { useState } from "react";
import BookMain from "../../components/BookMain/BookMain";
import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";
import Footer from "../../components/Footer/Footer";
import IBookPreview from "../../interfaces/IBookPreview";
import FoundBooksMain from "../../components/FoundBooksMain/FoundBooksMain";
import IBookData from "../../interfaces/IBookData";
import "./Library.css";

export default function Library(): JSX.Element {
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
  const [booksData, setBooksData] = useState<IBookPreview[]>([]);
  const [isBookOpen, setIsBookOpen] = useState<boolean>(false);

  const [bookData, setBookData] = useState<IBookData>({
    authorNames: "default",
    title: "default",
    bookId: -1,
    clicks: 0,
    year: 0,
    viewsCount: 0,
  });

  // Choose which main part to display
  const renderMain = () => {
    if (isBookOpen) {
      // navigate("/book");
      return <BookMain bookData={bookData} />;
    }

    if (isSearchActive) {
      return (
        <FoundBooksMain booksData={booksData} setIsBookOpen={setIsBookOpen} />
      );
    }

    return <Main setIsBookOpen={setIsBookOpen} setBookData={setBookData} />;
  };

  return (
    <div className="library">
      <Header
        setIsSearchActive={setIsSearchActive}
        setIsBookOpen={setIsBookOpen}
        setBooksData={setBooksData}
      ></Header>
      {renderMain()}
      <Footer />
    </div>
  );
}
