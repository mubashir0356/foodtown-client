import React from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const jwtToken = Cookies.get("jwtToken");
  //   const navigate = useNavigate();
  if (!jwtToken) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
