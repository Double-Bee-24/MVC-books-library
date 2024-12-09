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
import { ProtectedRoute } from "./routes/ProtectedRoute.tsx";
import { PublicRoute } from "./routes/PublicRoute.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  { path: "/book", element: <Book /> },
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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
