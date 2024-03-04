/* ===== Dependencies and Modules ===== */
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./UserContext";
/* ===== Components ===== */
import AppNavbar from "./components/AppNavbar";
/* ===== Pages ===== */
// import Error from './pages/Error';
import Home from "./pages/Home";
// import Login from './pages/Login';
// import Logout from "./pages/Logout";
// import Profile from "./pages/Profile";
// import Register from "./pages/Register";
// import Shop from "./pages/Shop";
/* ===== Styling ===== */
import './App.css';

/* ===== App ===== */
export default function App() {
  // State variables to manage user data and loading state
  const [user, setUser] = useState(null); // Current user data
  const [loading, setLoading] = useState(true); // Loading state

  // Function to unset user data and clear all data from localStorage
  const unsetUser = () => {
    localStorage.clear();
    setUser(null); // Reset user data
  }

  useEffect(() => {
    // Function to fetch user data
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      // Check if token exists
      if (!token) {
        setLoading(false); // No token, loading complete
        return; // Exit early
      }

      try {
        const response = await fetch(`http://localhost:4000/api/v1/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();

        if (data.user) {
          setUser({
            id: data.user._id,
            isAdmin: data.user.isAdmin
          });
        } else {
          setUser({ id: null, isAdmin: null });
        }

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // Loading complete
      }
    };

    fetchData();
  }, []);

  // If loading, display loading indicator
  if (loading) {
    return (
      <div>Loading...</div> 
    );
  }
  
  // Render the main application when loading is complete
  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <AppNavbar />
          <Routes>
            <Route path="/" element={<Home />}/>
            {/* <Route path="/login" element={<Login />}/>
            <Route path="/logout" element={<Logout />}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/shop" element={<Shop />}/>
            <Route path="/*" element={<Error />} /> */}
          </Routes>
      </Router>
    </UserProvider>
  );

}