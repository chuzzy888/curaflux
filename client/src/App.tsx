import Home from "./pages/locum/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Navbar from "./components/navbar/Navbar";
import Verification from "./pages/locum/Verification";
import Shift from "./pages/locum/Shift";
import ShiftDetails from "./pages/locum/ShiftDetails";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
  matchPath,
} from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { Toaster } from "./components/ui/toaster";
import { User } from "./protect/user";
import Cookies from "js-cookie";
import ForgotPassword from "./pages/auth/forgot-password";
import ResetPassword from "./pages/auth/reset-password";
import Admin from "./pages/Healthcare/Admin";
import Profile from "./pages/locum/profile/Profile";
import EditProfile from "./pages/locum/profile/Edit-profile";
import { jwtDecode, JwtPayload } from "jwt-decode";
import ShiftForYou from "./pages/locum/ShiftForYou";
import HospitalRegister from "./pages/Healthcare/auth/Register";
import { HealthCareVerification } from "./pages/Healthcare/auth/verification";
import { Healthcare } from "./protect/healthcare";
import LoginRole from "./Role/LoginRole";
import HospitalLogin from "./pages/Healthcare/auth/Login";
import RegisterRole from "./Role/RegisterRole";
import Dashboard from "./pages/Healthcare/Dashboard";
import AllShifts from "./pages/Healthcare/All-shifts";
import PageNotFound from "./pages/404/PageNotFound";
import HealthCareShiftDetails from "./pages/Healthcare/Shift-details";

interface CustomJwtPayload extends JwtPayload {
  nickName: string;
  hospitalName: string;
}

// interface CustomHealthcareJwtPayload extends JwtPayload {
//   hospitalName: string;
// }

function AppWrapper() {
  const location = useLocation();
  const token = Cookies.get("locumToken");
  const verified = Cookies.get("locumVerified");

  const decode = token ? jwtDecode<CustomJwtPayload>(token) : null;

  // healthcare
  const healthcareToken = Cookies.get("healthcareToken");
  const healthcareTecode = healthcareToken
    ? jwtDecode<CustomJwtPayload>(healthcareToken)
    : null;

  const isNavbarHidden =
    location.pathname === "/login-role" ||
    location.pathname === "/login" ||
    location.pathname === "/login-role" ||
    location.pathname === "/login/healthcare" ||
    location.pathname === "/register" ||
    location.pathname === "/choose-role" ||
    location.pathname === "/register/healthcare" ||
    location.pathname === "/login/healthcare" ||
    location.pathname === "/register/getVerified" ||
    location.pathname === "/forgot-password" ||
    location.pathname === "/curaflux/medixcare/admin" ||
    matchPath("/reset-password/:token", location.pathname) ||
    location.pathname === "/verify" ||
    location.pathname === "/shift" ||
    location.pathname === `/profile/${decode?.nickName}` ||
    matchPath(`/edit-profile-${decode?.nickName}/:userId`, location.pathname) ||
    // healthcare section
    location.pathname.includes("/curaflux");

  

  return (
    <>
      <AuthProvider>
        {/* Show Navbar on all routes except for authentication routes */}
        {!isNavbarHidden && <Navbar />}

        <Routes>
          <Route path="/" element={<Home />} />

          {/* auth */}
          <Route path="/choose-role" element={<RegisterRole />} />
          <Route path="/login-role" element={<LoginRole />} />
          <Route
            path="/login"
            element={token ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={token ? <Navigate to="/verify" /> : <Register />}
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          {/* auth */}

          {/* verification */}
          <Route
            path="/verify"
            element={
              token && verified !== "true" ? (
                <Verification />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          {/* verification */}

          {/* Protected routes for user */}
          <Route element={<User />}>
            <Route path="/shift" element={<Shift />} />
            <Route path="/shift-details/:id" element={<ShiftDetails />} />
            <Route
              path={`/profile/${decode?.nickName}`}
              element={<Profile />}
            />
            <Route
              path={`/edit-profile-${decode?.nickName}/:userId`}
              element={<EditProfile />}
            />

            <Route path="/shift-for-you" element={<ShiftForYou />} />
          </Route>
          {/* Protected routes for user */}

          {/* Protected route for admin */}
          <Route path="/register/healthcare" element={<HospitalRegister />} />
          <Route path="/login/healthcare" element={<HospitalLogin />} />
          <Route
            path="/register/getVerified"
            element={<HealthCareVerification />}
          />
          <Route element={<Healthcare />}>
            <Route
              path={`/curaflux/${healthcareTecode?.hospitalName?.replace(
                " ",
                ""
              )}/admin`}
              element={<Admin />}
            >
              <Route index element={<Dashboard />} />
              <Route path="all-shift" element={<AllShifts />} />
              <Route
                path="shift-details/:shiftId"
                element={<HealthCareShiftDetails />}
              />
            </Route>
          </Route>
          {/* Protected route for admin */}

          {/* Fallback route for undefined paths */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>

        <Toaster />
      </AuthProvider>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
