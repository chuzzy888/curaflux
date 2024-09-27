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
} from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { Toaster } from "./components/ui/toaster";
import { User } from "./protect/user";
import Cookies from "js-cookie";
import Admin from "./Healthcare/Admin";

function AppWrapper() {
  const location = useLocation();
  const token = Cookies.get("token");
  const verified = Cookies.get("verified");

  return (
    <>
      <AuthProvider>
        {/* Show Navbar on all routes except for authentication routes */}
        {location.pathname !== "/login" &&
          location.pathname !== "/register" &&
          location.pathname !== "/curaflux/medixcare/admin" &&
          location.pathname !== "/verify" && <Navbar />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/curaflux/medixcare/admin" element={<Admin />} />

          <Route
            path="/login"
            element={token ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={token ? <Navigate to="/verify" /> : <Register />}
          />
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
