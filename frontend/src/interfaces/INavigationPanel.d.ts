export interface INavigationPanel {
  totalBooksCount: number;
  displayedBooksCount: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
}
