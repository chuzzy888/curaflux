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
