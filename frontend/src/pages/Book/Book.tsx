import Header from "../../components/Header/Header";
import BookMain from "../../components/BookMain/BookMain";
import Footer from "../../components/Footer/Footer";

import "./Book.css";

export default function Book(): JSX.Element {
  return (
    <>
      <Header></Header>
      <BookMain></BookMain>
      <Footer></Footer>
    </>
  );
}
