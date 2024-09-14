import Cookies from "js-cookie";
import { Outlet, Navigate } from "react-router-dom";

export const User = () => {
  const token = Cookies.get("token");
  const verified = Cookies.get("verified");

  const isAuthenticated = token && verified === "true";

  return <main>{isAuthenticated ? <Outlet /> : <Navigate to="/login" />}</main>;
};
