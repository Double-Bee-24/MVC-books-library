import { INavigationPanel } from "../../interfaces/INavigationPanel";
import "./NavigationPanel.css";

export default function NavigationPanel({
  totalBooksCount,
  displayedBooksCount,
  setOffset,
}: INavigationPanel): JSX.Element {
  const handelDecreaseBooks = (): void => {
    // Subtract 20 from displayed books if possible, otherwise set 20 as default
    const newOffset =
      displayedBooksCount - 20 >= 20 ? displayedBooksCount - 20 : 20;

    setOffset(newOffset);
  };

  const handelIncreaseBooks = (): void => {
    // Add 20 to the current offset if possible, otherwise - total books count
    const newOffset =
      displayedBooksCount + 20 < totalBooksCount
        ? displayedBooksCount + 20
        : totalBooksCount;

    setOffset(newOffset);
  };

  return (
    <div className="navigation-panel">
      {displayedBooksCount > 20 && (
        <button className="navigation-button" onClick={handelDecreaseBooks}>
          Назад
        </button>
      )}
      <p>
        Показано книг: {displayedBooksCount} з {totalBooksCount}
      </p>
      {displayedBooksCount !== totalBooksCount && (
        <button className="navigation-button" onClick={handelIncreaseBooks}>
          Вперед
        </button>
      )}
    </div>
  );
}
