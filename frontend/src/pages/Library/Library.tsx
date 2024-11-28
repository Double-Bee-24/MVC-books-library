import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";
import Footer from "../../components/Footer/Footer";
import "./Library.css";

export default function Library(): JSX.Element {
  return (
    <div className="library">
      <Header></Header>
      <Main></Main>
      <Footer></Footer>
    </div>
  );
}
