import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Navbar from "./components/Navbar";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Verification from "./pages/Verification";
import { AuthProvider } from "./context/authContext";
import { Toaster } from "./components/ui/toaster";
import Shift from "./pages/Shift";
import ShiftDetails from "./pages/ShiftDetails";

function AppWrapper() {
  const location = useLocation();

  return (
    <>
      <AuthProvider>
        {location.pathname === "/" && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify" element={<Verification />} />
          <Route path="/shift" element={<Shift />} />
          <Route path="/shift-details/:id" element={<ShiftDetails />} />
        </Routes>
        <Toaster />
      </AuthProvider>
      {/* {location.pathname === "/" && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes> */}
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
