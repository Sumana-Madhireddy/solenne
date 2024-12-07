import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ToastContainer } from 'react-toastify';  // Import ToastContainer

ReactDOM.render(
  <React.StrictMode>
    <App />
    <ToastContainer />  {/* Add ToastContainer here */}
  </React.StrictMode>,
  document.getElementById('root')
);
