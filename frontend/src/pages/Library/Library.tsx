import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";
import Footer from "../../components/Footer/Footer";
import { useState } from "react";
import IBookPreview from "../../interfaces/IBookPreview";
import FoundBooksMain from "../../components/FoundBooksMain/FoundBooksMain";
import "./Library.css";

export default function Library(): JSX.Element {
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
  const [booksData, setBooksData] = useState<IBookPreview[]>([]);

  return (
    <div className="library">
      <Header
        setIsSearchActive={setIsSearchActive}
        setBooksData={setBooksData}
      ></Header>
      {isSearchActive ? <FoundBooksMain booksData={booksData} /> : <Main />}
      <Footer />
    </div>
  );
}
