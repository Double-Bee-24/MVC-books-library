import instance from "../api/axiosConfig";
import IBookPreview from "../interfaces/IBookPreview";

// Fetches books from server
const getBooks = async (): Promise<IBookPreview[]> => {
  try {
    const response = await instance.get("/books");
    const data: IBookPreview[] = response.data;
    console.log("Received books: ", data);

    return data;
  } catch (error) {
    console.error("Error while fetching books: ", error);
    return [];
  }
};

const deleteBook = async (bookId: number): Promise<void> => {
  try {
    const response = await instance.delete(`/books/${bookId}`);
    const data = response.data;
    console.log("Received books: ", data);
  } catch (error) {
    console.error("Error while fetching books: ", error);
  }
};

export { getBooks, deleteBook };
