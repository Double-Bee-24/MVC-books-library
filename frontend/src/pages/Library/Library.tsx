import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ILibrary from "../../interfaces/ILibrary";
import "./Library.css";

export default function Library({
  setIsSearchActive,
  setIsBookOpen,
  setBooksData,
  isBookOpen,
  isSearchActive,
}: ILibrary): JSX.Element {
  const navigate = useNavigate();

  // Choose which main part to display
  useEffect(() => {
    if (isBookOpen) {
      navigate("/book");
    } else if (isSearchActive) {
      navigate("/found-books");
    } else {
      navigate("/");
    }
  }, [isBookOpen, isSearchActive, navigate]);

  return (
    <div className="library">
      <Header
        setIsSearchActive={setIsSearchActive}
        setIsBookOpen={setIsBookOpen}
        setBooksData={setBooksData}
      ></Header>
      <Outlet></Outlet>
      <Footer />
    </div>
  );
}
