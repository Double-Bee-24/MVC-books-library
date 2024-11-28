import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "./reset.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.tsx";
import Book from "./pages/Book/Book.tsx";
import Login from "./pages/Login/Login.tsx";
import Admin from "./pages/Admin/Admin.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  { path: "/bookie", element: <Book /> },
  { path: "/login", element: <Login /> },
  { path: "/admin", element: <Admin /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
