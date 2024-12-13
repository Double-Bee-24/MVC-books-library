import { Setter } from "../types/Setter";
import IBookData from "./IBookData";
import IBookPreview from "./IBookPreview";

export default interface ILibrary {
  setIsSearchActive: Setter<boolean>;
  setIsBookOpen: Setter<boolean>;
  setBooksData: Setter<IBookPreview[]>;
  isBookOpen: boolean;
  isSearchActive: boolean;
}
