// Navbar.js
import './Navbar.css';
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import logoImage from '../../src/logoImage.png';
import Login from './auth0/Login';
import Profile from './auth0/Profile';
import LogoutButton from './auth0/LogoutButton';


import { Search } from "monday-ui-react-core";

const Navbar = () => {
  const { isAuthenticated } = useAuth0();

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
      <Search placeholder="Search" size={Search.sizes.LARGE} />
      </div>
      {isAuthenticated ? (
        // If user is authenticated, show the profile and logout button
        <div className="profile-container">
          <Profile />
          <LogoutButton className="logout-button" />
        </div>
      ) : (
        // If user is not authenticated, show the login button
        <Login />
      )}
    </nav>
  );
};

export default Navbar;
