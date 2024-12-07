import { useEffect, useState } from "react";
import IBookPreview from "../../interfaces/IBookPreview";
import { searchBooks } from "../../services/booksService";
import "./FindBookForm.css";

interface IFindBookForm {
  setIsSearchActive: React.Dispatch<React.SetStateAction<boolean>>;
  setBooksData: React.Dispatch<React.SetStateAction<IBookPreview[]>>;
}

export default function FindBookForm({
  setIsSearchActive,
  setBooksData,
}: IFindBookForm): JSX.Element {
  const [searchString, setSearchString] = useState<string>("");

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await searchBooks(searchString);
      setBooksData(data);
      console.log(data, "dog");
    };

    fetchBooks();
  }, [searchString]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;

    setSearchString(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setIsSearchActive(true);
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Ввести назву книги або автора"
        onChange={handleChange}
        value={searchString}
      />
    </form>
  );
}
