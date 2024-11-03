import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import './index.css';
import Header from './components/Header/Header';
import Products from './components/Products/Products';
import Signup from './components/Signup/Signup';
import Signin from './components/Signup/Signin';
import ProductDetail from './components/Products/Product/ProductDetail';
import Cart from './components/Cart/Cart';
import { CartProvider } from './components/Context/CartContext';
import CheckoutSuccess from './components/Cart/CheckoutSuccess';
import Account from './components/Account/Account';
import Orders from './components/Orders/Orders';
import OrderSummary from './components/Orders/OrderSummary';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(()=>{
    const storedAuth = localStorage.getItem('isAuthenticated');
    return storedAuth === 'true';
  });
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setUsername('');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
  };

  
  return (
    <CartProvider>
    <Router>
      {isAuthenticated && <Header onSignOut={handleSignOut} username={username} />}
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/" element={<Navigate to="/signin" />} />
            <Route path="/products" element={<Navigate to="/signin" />} />
            <Route path="/signin" element={<Signin onSignIn={() => {
              setIsAuthenticated(true);
              setUsername(localStorage.getItem('username') || '');
            }} />} />
            <Route path="/signup" element={<Signup onSignup={() => {
              setIsAuthenticated(true);
              setUsername(localStorage.getItem('username') || '');
              }} />} />
            <Route path="/cart" element={<Navigate to="/signin" />} />
            <Route path="/checkout-success" element={<Navigate to="/signin" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Navigate to="/products" />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product-detail/:id" element={<ProductDetail />} />
            <Route path="/signin" element={<Navigate to="/products" />} />
            <Route path="/signup" element={<Navigate to="/products" />} />
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/checkout-success' element={<CheckoutSuccess/>}/>
            <Route path='/account' element={<Account/>}/>
            <Route path='/orders' element={<Orders/>}/>
            <Route path="/order-summary/:orderId" element={<OrderSummary />} />
          </>
        )}
      </Routes>
    </Router>
    </CartProvider>
  );
}

export default App;
