import { useEffect, useState } from "react";
import IFindBookForm from "../../interfaces/IFindBookForm";
import { searchBooks } from "../../services/booksService";
import "./FindBookForm.css";

export default function FindBookForm({
  setIsSearchActive,
  setBooksData,
  setIsBookOpen,
}: IFindBookForm): JSX.Element {
  const [searchString, setSearchString] = useState<string>("");

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await searchBooks(searchString);
      setBooksData(data);
    };

    fetchBooks();
  }, [searchString]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;

    setSearchString(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setIsBookOpen(false);
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
