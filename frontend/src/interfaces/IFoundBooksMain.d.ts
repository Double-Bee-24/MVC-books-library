import { Setter } from "../types/Setter";

export default interface IFoundBooksMain {
  booksData: IBookPreview[];
  setIsBookOpen: Setter<boolean>;
}
