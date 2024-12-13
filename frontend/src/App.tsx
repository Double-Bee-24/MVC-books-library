import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { PublicRoute } from "./routes/PublicRoute";
import Admin from "./pages/Admin/Admin";
import Login from "./pages/Login/Login";
import Library from "./pages/Library/Library";
import Main from "./components/Main/Main";
import BookMain from "./components/BookMain/BookMain";
import FoundBooksMain from "./components/FoundBooksMain/FoundBooksMain";
import IBookData from "./interfaces/IBookData";
import IBookPreview from "./interfaces/IBookPreview";
import "./App.css";

function App(): JSX.Element {
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
  const [booksData, setBooksData] = useState<IBookPreview[]>([]);
  const [isBookOpen, setIsBookOpen] = useState<boolean>(false);

  const [bookData, setBookData] = useState<IBookData>({
    authorNames: "default",
    title: "default",
    bookId: -1,
    clicks: 0,
    year: 0,
    viewsCount: 0,
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Library
          setIsSearchActive={setIsSearchActive}
          setIsBookOpen={setIsBookOpen}
          setBooksData={setBooksData}
          isBookOpen={isBookOpen}
          isSearchActive={isSearchActive}
        />
      ),
      children: [
        { path: "book", element: <BookMain bookData={bookData} /> },
        {
          path: "found-books",
          element: (
            <FoundBooksMain
              booksData={booksData}
              setIsBookOpen={setIsBookOpen}
            />
          ),
        },
        {
          path: "/",
          element: (
            <Main setIsBookOpen={setIsBookOpen} setBookData={setBookData} />
          ),
        },
      ],
    },
    {
      path: "/login",
      element: (
        <PublicRoute>
          <Login />
        </PublicRoute>
      ),
    },
    {
      path: "/admin",
      element: (
        <ProtectedRoute>
          <Admin />
        </ProtectedRoute>
      ),
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
