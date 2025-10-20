import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { apiFetch } from "./api.js";

function PublicRoute({ children }) {

  useEffect(() => {
    async function verify() {
      const res = await apiFetch("http://localhost:5000/verifyToken", {
        method: "POST",
      });
      if (res.status === 200 ) {
        return <Navigate to="/portfolio" replace />;
      }
    }
    verify();
  }, []);

  return children;
}

export default PublicRoute;