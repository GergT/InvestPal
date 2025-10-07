import { Navigate } from "react-router-dom";

function PublicRoute({ token, children }) {
  if (token) {
    return <Navigate to="/portfolio" replace />;
  }
  return children;
}

export default PublicRoute;