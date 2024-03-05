/* ===== Dependencies and Modules ===== */
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./UserContext";
/* ===== Components ===== */
import AppNavbar from "./components/AppNavbar";
/* ===== Pages ===== */
import Error from './pages/Error';
import Home from "./pages/Home";
import Login from './pages/Login';
import Logout from "./pages/Logout";
// import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Products from "./pages/Products";
/* ===== Styling ===== */
import './App.css';

/* ===== App ===== */
export default function App() {
  const [user, setUser] = useState(null); 

  const unsetUser = () => {
    localStorage.clear();
    setUser(null);
  }

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(`http://localhost:4003/b3/users/details`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

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
      }
    };

    fetchData();
  }, []);
  
  // Render the main application when loading is complete
  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <AppNavbar />
          <div className="max-w-full">
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/login" element={<Login />}/>
              <Route path="/logout" element={<Logout />}/>
              {/* <Route path="/profile" element={<Profile />}/> */}
              <Route path="/register" element={<Register />}/>
              <Route path="/shop" element={<Products />}/>
              <Route path="/*" element={<Error />} />
            </Routes>
          </div>
      </Router>
    </UserProvider>
  );

}