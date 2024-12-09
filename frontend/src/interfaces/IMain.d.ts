import { Setter } from "../types/Setter";
import IBookData from "./IBookData";

export default interface IMain {
  setIsBookOpen: Setter<boolean>;
  setBookData: Setter<IBookData>;
}
