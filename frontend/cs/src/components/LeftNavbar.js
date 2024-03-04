import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom if you're using routing
import './LeftNavbar.css'

const LeftNavbar = () => {
  return (
    <div className="left-navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        {/* Add more links as needed */}
      </ul>
    </div>
  );
};

export default LeftNavbar;
