import { instance, adminInstance } from "../api/axiosConfig";
import IBookPreview from "../interfaces/IBookPreview";

interface IGetBooksParams {
  offset?: number | string;
  search?: string;
  author?: number;
  year?: number;
}

// Fetches books from server
const getBooks = async (
  params: IGetBooksParams
): Promise<{ books: IBookPreview[]; totalBooksCount: number }> => {
  try {
    // const defaultParams = { offset: 20 };
    const response = await instance.get("/books", {
      params,
    });

    const books: IBookPreview[] = response.data.books;
    const totalBooksCount: number = response.data.totalBooksCount;

    return { books, totalBooksCount };
  } catch (error) {
    console.error("Error while fetching books: ", error);
    return { books: [], totalBooksCount: 0 };
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

const searchBooks = async (searchString: string): Promise<IBookPreview[]> => {
  try {
    const response = await instance.get("/books/search", {
      params: { searchString },
    });

    const books: IBookPreview[] = response.data;
    return books;
  } catch (error) {
    console.error("Error while searching a book: ", error);
    return [];
  }
};

export { getBooks, deleteBook, increaseBookRate, createBook, searchBooks };
