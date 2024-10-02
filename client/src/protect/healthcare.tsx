import Cookies from "js-cookie";
import { Outlet, Navigate } from "react-router-dom";

export const Healthcare = () => {
  const healthcareToken = Cookies.get("healthcareToken");
  const verified = Cookies.get("verified");

  const isAuthenticated = healthcareToken && verified === "true";
  return <main>{isAuthenticated ? <Outlet /> : <Navigate to="/login" />}</main>;
};
