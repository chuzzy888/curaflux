import Cookies from "js-cookie";
import { Outlet, Navigate } from "react-router-dom";

export const Healthcare = () => {
  const token = Cookies.get("healthcareToken");
  const verified = Cookies.get("verified");

  const isAuthenticated = token && verified === "true";
  return <main>{isAuthenticated ? <Outlet /> : <Navigate to="/login" />}</main>;
};
