import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header/Header';
import Products from './components/Products/Products';
import Signup from './components/Signup/Signup';
import Signin from './components/Signup/Signin';
import ProductDetail from './components/Products/Product/ProductDetail';
import Cart from './components/Cart/Cart';
import { CartProvider } from './components/Context/CartContext';
import CheckoutSuccess from './components/Cart/CheckoutSuccess';
import Account from './components/Header/Account';
import Orders from './components/Orders/Orders';
import OrderSummary from './components/Orders/OrderSummary';
import AddProduct from './components/Admin/Products/AddProduct';
import ProductList from './components/Admin/Products/ProductList';
import Dashboard from './components/Admin/Dashboard';
import AllOrders from './components/Admin/Orders/Orders';
import ViewOrder from './components/Admin/Orders/ViewOrder';
import AdminHeader from './components/Admin/AdminHeader';
import HomePage from './components/HomePage/HomePage';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import Sale from './components/Sale/Sale';
import Users from './components/Admin/Users/Users';
import EditUser from './components/Admin/Users/EditUser';
import EditProduct from './components/Admin/Products/EditProducts';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    return storedAuth === 'true';
  });
  const [email, setEmail] = useState(localStorage.getItem('email'));
  const [firstName, setFirstName] = useState(localStorage.getItem('firstName'));
  const [role, setRole] = useState(localStorage.getItem('role') || 'user');

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setFirstName('');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('authToken');
    localStorage.removeItem('firstName');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
  };

  const ProtectedUserRoute = ({ element }) => {
    return role === 'user' || role === 'admin' ? element : <Navigate to="/signin" />;
  };

  const ProtectedAdminRoute = ({ element }) => {
    return role === 'admin' ? element : <Navigate to="/admin/dashboard" />;
  };

  const AppRoutes = () => {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');

    return (
      <div className="flex flex-col min-h-screen">
        {isAuthenticated && (isAdminRoute ? <AdminHeader onSignOut={handleSignOut} /> : <Header onSignOut={handleSignOut} />)}
        <main className="flex-grow">
          <Routes>
            {!isAuthenticated ? (
              <>
                <Route path="/" element={<Navigate to="/signin" />} />
                <Route path="/signin" element={<Signin onSignIn={() => {
                  setIsAuthenticated(true);
                  setFirstName(localStorage.getItem('firstName') || '');
                  setRole(localStorage.getItem('role') || 'user');
                  setRole(localStorage.getItem('email') || '');
                  
                }} />} />
                <Route path="/signup" element={<Signup onSignup={() => {
                  setIsAuthenticated(true);
                  setFirstName(localStorage.getItem('firstName'));
                  setRole(localStorage.getItem('role') || 'user');
                  setRole(localStorage.getItem('email') || '');
                }} />} />
              </>
            ) : (
              <>
                {/* User routes */}
                {/* <Route path="/" element={role === 'admin' ? <Navigate to="/admin/dashboard" /> : <HomePage />} /> */}
                <Route path="/" element={<HomePage />} />
                <Route path="/signin" element={<Navigate to="/" />} />
                <Route path="/signup" element={<Navigate to="/" />} />
                <Route path="/shop" element={<Navigate to="/products" />} />
                <Route path="/About" element={<About />} />
                <Route path="/Contact" element={<Contact />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product-detail/:id" element={<ProductDetail />} />
                <Route path='/cart' element={<ProtectedUserRoute element={<Cart />} />} />
                <Route path='/checkout-success' element={<ProtectedUserRoute element={<CheckoutSuccess />} />} />
                <Route path='/account' element={<ProtectedUserRoute element={<Account />} />} />
                <Route path='/orders' element={<ProtectedUserRoute element={<Orders />} />} />
                <Route path="/order-summary/:orderId" element={<ProtectedUserRoute element={<OrderSummary />} />} />
                <Route path="/Sale" element={<Sale />} />

                {/* Admin-only routes */}
                <Route path='/admin/dashboard' element={<ProtectedAdminRoute element={<Dashboard onSignOut={handleSignOut} firstName={firstName} key={Date.now()}/>} />} />
                <Route path='/admin/add-product' element={<ProtectedAdminRoute element={<AddProduct />} />} />
                <Route path='/admin/product-list' element={<ProtectedAdminRoute element={<ProductList />} />} />
                <Route path="/admin/edit-product/:id" element={<ProtectedUserRoute element={<EditProduct />} />} />
                <Route path='/admin/all-orders' element={<ProtectedAdminRoute element={<AllOrders />} />} />
                <Route path="/admin/orders/:orderId" element={<ProtectedUserRoute element={<ViewOrder />} />} />
                <Route path='/admin/all-users' element={<ProtectedAdminRoute element={<Users />} />} />
                <Route path="/admin/users/:id" element={<ProtectedUserRoute element={<EditUser />} />} />
              </>
            )}
          </Routes>
        </main>
        <Footer />
      </div>
    );
  };

  return (
    <CartProvider>
      <Router>
        <AppRoutes />
      </Router>
    </CartProvider>
  );
}

export default App;
