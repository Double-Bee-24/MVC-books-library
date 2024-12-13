import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
}

// Available only for authorized user
export function ProtectedRoute({ children }: ProtectedRouteProps): JSX.Element {
  const authorizationStatus = localStorage.getItem("auth_status");

  if (authorizationStatus !== "authorized") {
    return <Navigate to="/login" replace />;
  }

  return children;
}
