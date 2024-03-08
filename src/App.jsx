/* ===== Dependencies and Modules ===== */
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./UserContext";
/* ===== Components ===== */
import AppNavbar from "./components/AppNavbar";
import Footer from "./components/Footer";
/* ===== Pages (ALL ACCESS) ===== */
import Home from "./pages/Home";
import Login from './pages/Login';
import Logout from "./pages/Logout";
import ProductView from "./pages/ProductView";
import Register from "./pages/Register";
import Shop from "./pages/Shop";
/* ===== Pages (ADMIN ACCESS) ===== */
import AddProduct from "./pages/AddProduct";
import Dashboard from "./pages/Dashboard";
import EditProduct from "./pages/EditProduct";
/* ===== Pages (ERROR) ===== */
import NotFound from './pages/error-pages/NotFound';
import Forbidden from './pages/error-pages/Forbidden';
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
      const apiUrl = process.env.REACT_APP_API_URL;

      try {
        const response = await fetch(`${apiUrl}/b3/users/details`, {
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
          setUser({ 
            id: null, 
            isAdmin: null 
          });
        }

      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <AppNavbar />
          <div className="w-full pt-16">
            <Routes>
              {/* ALL ACCESS PAGES */}
              <Route path="/" element={<Home />}/>

              {/* AUTHENTICATION PAGES */}
              <Route path="/login" element={<Login />}/>
              <Route path="/logout" element={<Logout />}/>
              <Route path="/register" element={<Register />}/>

              {/* SHOP PAGES */}
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/:productId" element={<ProductView />} />

              {/* ADMIN ACCESS DASHBOARD PAGES */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/product/add" element={<AddProduct />} />
              <Route path="/dashboard/product/:productId" element={<EditProduct />} />

               {/* ERROR PAGES */}
               <Route path="/*" element={<NotFound />} />
              <Route path="/403" element={<Forbidden />}/>
            </Routes>
          </div>
        <Footer />
      </Router>
    </UserProvider>
  );
}