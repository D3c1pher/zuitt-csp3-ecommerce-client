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
import Shop from "./pages/Shop";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import ProductView from "./pages/ProductView";
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
          <div className="max-w-full pt-16">
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/login" element={<Login />}/>
              <Route path="/logout" element={<Logout />}/>
              {/* <Route path="/profile" element={<Profile />}/> */}
              <Route path="/register" element={<Register />}/>
              {/* <Route path="/products" element={<Products />}/> */}
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/:productId" element={<ProductView />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/add-product" element={<AddProduct />} />
              <Route path="/dashboard/edit-product/:productId" element={<EditProduct />} />
              <Route path="/*" element={<Error />} />
            </Routes>
          </div>
      </Router>
    </UserProvider>
  );

}