import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import './index.css';
import Header from './components/Header/Header';
import Products from './components/Products/Products';
import Signup from './components/Signup/Signup';
import Signin from './components/Signup/Signin';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(()=>{
    const storedAuth = localStorage.getItem('isAuthenticated');
    return storedAuth === 'true';
  });

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  const handleSignOut = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('authToken');
  };
  console.log('isAuthenticated:', isAuthenticated);
  
  return (
    <Router>
      {isAuthenticated && <Header onSignOut={handleSignOut}/>}
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/" element={<Navigate to="/signin" />} />
            <Route path="/products" element={<Navigate to="/signin" />} />
            <Route path="/signin" element={<Signin onSignIn={() => setIsAuthenticated(true)} />} />
            <Route path="/signup" element={<Signup onSignup={() => setIsAuthenticated(true)} />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Navigate to="/products" />} />
            <Route path="/products" element={<Products />} />
            <Route path="/signin" element={<Navigate to="/products" />} />
            <Route path="/signup" element={<Navigate to="/products" />} />
          </>
        )}
      </Routes>
    </Router>
  )
}

export default App;
