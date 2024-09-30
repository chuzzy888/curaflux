import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Navbar from "./components/Navbar";
import Verification from "./pages/Verification";
import Shift from "./pages/Shift";
import ShiftDetails from "./pages/ShiftDetails";
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
import Admin from "./Healthcare/Admin";
import useAuthStore from "./redux/store/authStore";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/Edit-profile";

function AppWrapper() {
  const location = useLocation();
  const token = Cookies.get("token");
  const verified = Cookies.get("verified");

  const { userInfo } = useAuthStore();

  const isNavbarHidden =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/forgot-password" ||
    location.pathname === "/curaflux/medixcare/admin" ||
    matchPath("/reset-password/:token", location.pathname) ||
    location.pathname === "/verify" ||
    location.pathname === "/shift" ||
    location.pathname === `/profile/${userInfo.nickName}` ||
    matchPath(`/edit-profile-${userInfo.nickName}/:userId`, location.pathname);

  return (
    <>
      <AuthProvider>
        {/* Show Navbar on all routes except for authentication routes */}
        {!isNavbarHidden && <Navbar />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/curaflux/medixcare/admin" element={<Admin />} />

          {/* auth */}
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

          {/* Protected routes */}
          <Route element={<User />}>
            <Route path="/shift" element={<Shift />} />
            <Route path="/shift-details/:id" element={<ShiftDetails />} />
            <Route
              path={`/profile/${userInfo.nickName}`}
              element={<Profile />}
            />
            <Route
              path={`/edit-profile-${userInfo.nickName}/:userId`}
              element={<EditProfile />}
            />
          </Route>

          {/* Fallback route for undefined paths */}
          <Route path="*" element={<Navigate to="/" />} />
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
