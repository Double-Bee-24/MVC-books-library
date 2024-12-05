import Header from "../../components/Header/Header";
import BookMain from "../../components/BookMain/BookMain";
import Footer from "../../components/Footer/Footer";
// import { useLocation } from "react-router-dom";
import "./Book.css";

export default function Book(): JSX.Element {
  return (
    <div className="book-page">
      <Header></Header>
      <BookMain></BookMain>
      <Footer></Footer>
    </div>
  );
}
