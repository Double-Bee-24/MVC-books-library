import { Setter } from "../types/Setter";
import IBookData from "./IBookData";
import IBookPreview from "./IBookPreview";

export default interface IFindBookForm {
  setIsSearchActive: Setter<boolean>;
  setBooksData: Setter<IBookData[]>;
  setIsBookOpen: Setter<boolean>;
}
