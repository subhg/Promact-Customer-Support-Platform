// Navbar.js

// Import necessary dependencies and styles
import './Navbar.css';
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import logoImage from '../../src/logoImage.png';
import Login from '../components/auth0/Login';
import Profile from '../components/auth0/Profile';
import LogoutButton from '../components/auth0/LogoutButton';

// Import the Monday UI React Core Search component
import { Search } from "monday-ui-react-core";

// Functional component for the Navbar
const Navbar = () => {
  // Destructure authentication status from Auth0
  const { isAuthenticated } = useAuth0();

  return (
    <nav className="navbar">
      {/* Logo section */}
      <div className="logo-container">
        <img src={logoImage} alt="Logo" className="logo" />
      </div>

      {/* Customer support section */}
      <div className="customer-support">
        <div className="customer">Customer</div>
        <div className="support">Support</div>
      </div>

      {/* Search bar section */}
      <div className="search-bar">
        {/* Use the Monday UI React Core Search component */}
        <Search placeholder="Search" size={Search.sizes.LARGE} />
      </div>
  
      {/* Conditional rendering based on authentication status */}
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

// Export the Navbar component
export default Navbar;
