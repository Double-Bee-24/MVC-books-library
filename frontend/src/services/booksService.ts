import { instance, adminInstance } from "../api/axiosConfig";
import IBookPreview from "../interfaces/IBookPreview";

// Fetches books from server
const getBooks = async (): Promise<IBookPreview[]> => {
  try {
    const response = await instance.get("/books");
    const data: IBookPreview[] = response.data;

    return data;
  } catch (error) {
    console.error("Error while fetching books: ", error);
    return [];
  }
};

// Increases book views or clicks count
const increaseBookRate = async (
  bookId: number,
  rateType: { rate: string }
): Promise<void> => {
  try {
    await instance.put(`/books/${bookId}`, rateType);
  } catch (error) {
    console.error("Error while increasing click rate: ", error);
  }
};

const createBook = async (bookData: IBookPreview): Promise<void> => {
  console.log(bookData, " book data before sending");
  try {
    await adminInstance.post(`/books`, bookData);
  } catch (error) {
    console.error("Error while increasing click rate: ", error);
  }
};

// Deletes item from library
const deleteBook = async (bookId: number): Promise<void> => {
  try {
    await adminInstance.delete(`/books/${bookId}`);
  } catch (error) {
    console.error("Error while deleting a book: ", error);
  }
};

export { getBooks, deleteBook, increaseBookRate, createBook };
