import IHeader from "../../interfaces/IHeader";
import FindBookForm from "../FindBookForm/FindBookForm";
import "./Header.css";

export default function Header({
  setIsSearchActive,
  setIsBookOpen,
  setBooksData,
}: IHeader): JSX.Element {
  const handleNavigate = (): void => {
    // Setting all open pages to false will redirect us to the main page by default
    setIsBookOpen(false);
    setIsSearchActive(false);
  };

  return (
    <>
      <header>
        <div className="find-container">
          <img
            src="/assets/images/library.png"
            alt="значок бібліотеки"
            className="big-logo"
            onClick={handleNavigate}
          />
          <FindBookForm
            setIsSearchActive={setIsSearchActive}
            setBooksData={setBooksData}
            setIsBookOpen={setIsBookOpen}
          ></FindBookForm>
        </div>
        <hr />
      </header>
    </>
  );
}
