import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: JSX.Element;
}

// Available only for unauthorized user
export function PublicRoute({ children }: PublicRouteProps): JSX.Element {
  const authorizationStatus = localStorage.getItem("auth_status");

  if (authorizationStatus === "authorized") {
    return <Navigate to="/admin" />;
  }

  return children;
}
