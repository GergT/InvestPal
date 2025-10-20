import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { apiFetch } from "./api.js";

function ProtectedRoutes({ children }) {
  const [isVerified, setIsVerified] = useState(null);

  useEffect(() => {
    async function verify() {
      const res = await apiFetch("http://localhost:5000/verifyToken", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        setIsVerified(true);
      } else {
        setIsVerified(false);
      }
    }
    verify();
  }, []);

  if (isVerified === true) return children;
  if (isVerified === false) return <Navigate to="/login" replace />;
  return null;
}

export default ProtectedRoutes;