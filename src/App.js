/* ===== Dependencies and Modules ===== */
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { UserProvider } from './UserContext';
/* ===== Components ===== */
import AppNavbar from './components/AppNavbar';
import Footer from './components/Footer';
/* ===== Pages (USER ACCESS) ===== */
import Cart from './pages/Cart';
import Discover from './pages/Discover';
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import MyOrders from './pages/MyOrders';
import ProductView from './pages/ProductView';
import UserProfile from './pages/UserProfile';
import Register from './pages/Register';
import Shop from './pages/Shop';
import Support from './pages/Support';
import UserSettings from './pages/UserSettings';
/* ===== Pages (ADMIN ACCESS) ===== */
import AddProduct from './pages/AddProduct';
import Dashboard from './pages/Dashboard';
import EditProduct from './pages/EditProduct';
/* ===== Pages (ERROR) ===== */
import Unauthorized from './pages/Unauthorized';
import NotFound from './pages/NotFound';
import Forbidden from './pages/Forbidden';
/* ===== Styling ===== */
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
/* ===== Animation ===== */
import AOS from 'aos';
import 'aos/dist/aos.css';

/* ===== App ===== */
export default function App() {
  const [user, setUser] = useState({
    access: localStorage.getItem("token"),
    id: null,
    isAdmin: null,
  });

  const unsetUser = () => {
    localStorage.clear();
    setUser({
      access: null,
      id: null,
      isAdmin: null,
    });
  };

  const token = localStorage.getItem('token');
  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (user.access) {
          const response = await fetch(`${apiUrl}/users/details`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const data = await response.json();

          if (data.user) {
            setUser({
              id: data.user._id,
              isAdmin: data.user.isAdmin,
              access: user.access,
            });
          } else {
            setUser({
              id: null,
              isAdmin: null,
              access: null,
            });
          }
        }
      } catch (err) {
        console.error('Error in fetching user details: ', err);
      }
    };

    fetchUserDetails();
  }, [apiUrl, token, user.access]);

  useEffect(() => {
    AOS.init({
      disable: false,
      startEvent: 'DOMContentLoaded',
      initClassName: 'aos-init',
      animatedClassName: 'aos-animate',
      useClassNames: false,
      disableMutationObserver: false,
      debounceDelay: 50,
      throttleDelay: 99,
      offset: 120,
      delay: 0,
      duration: 400,
      easing: 'ease',
      once: false,
      mirror: false,
      anchorPlacement: 'top-bottom',
    });
  }, []);

  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <ScrollToTop />
        <AppNavbar />
          <div className="w-full pt-20">
            <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover={false}
              theme="colored"
            />
            <Routes>
              {/* ALL ACCESS PAGES */}
              <Route path="/" element={<Home />}/>

              {/* AUTHENTICATION PAGES */}
              <Route path="/login" element={<Login />}/>
              <Route path="/logout" element={<Logout />}/>
              <Route path="/register" element={<Register />}/>

              {/* USER PAGES */}
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/:productId" element={<ProductView />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/my-orders" element={<MyOrders />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/support" element={<Support />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/account" element={<UserSettings />} />

              {/* ADMIN ACCESS DASHBOARD PAGES */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/product/add" element={<AddProduct />} />
              <Route path="/dashboard/edit-product/:productId" element={<EditProduct />} />

              {/* ERROR PAGES */}
              <Route path="/*" element={<NotFound />} />
              <Route path="/403" element={<Forbidden />}/>
              <Route path="/401" element={<Unauthorized />}/>
            </Routes>
          </div>
        <Footer />
      </Router>
    </UserProvider>
  );
}