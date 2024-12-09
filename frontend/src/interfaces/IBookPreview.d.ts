import { Setter } from "../types/Setter";
import IBookData from "./IBookData";

export default interface IBookPreview {
  bookData: IBookData;

  setIsBookOpen?: Setter<boolean>;
  setBookData?: Setter<IBookData>;
}
