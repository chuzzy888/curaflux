import Cookies from "js-cookie";
import { Outlet, Navigate } from "react-router-dom";

export const User = () => {
  const locumToken = Cookies.get("locumToken");
  const verified = Cookies.get("verified");

  const isAuthenticated = locumToken && verified === "true";

  return <main>{isAuthenticated ? <Outlet /> : <Navigate to="/login" />}</main>;
};
