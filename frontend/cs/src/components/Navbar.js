// Navbar.js
import './Navbar.css'
import React from 'react';
import logoImage from '../../src/logoImage.png'; // Assuming CS.jpg is in the src directory

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo-container">
       <img src={logoImage} alt="Logo" className="logo" />
      </div>
      <div className="customer-support">
        <div className="customer">Customer</div>
        <div className="support">Support</div>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
      </div>
      <div className="login-button">
        <button>Login</button>
      </div>
    </nav>
  );
};

export default Navbar;
