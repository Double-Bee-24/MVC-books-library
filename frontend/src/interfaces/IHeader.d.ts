import IBookData from "./IBookData";

export default interface IHeader {
  setIsSearchActive: Setter<boolean>;
  setIsBookOpen: Setter<boolean>;
  setBooksData: Setter<IBookData[]>;
}
