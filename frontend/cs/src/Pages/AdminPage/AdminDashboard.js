// AdminDashboard.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from '../../components/Navbar'
import LeftNavbar from '../../components/LeftNavbar';
import Admin from '../../components/Admin';
import { useAuth0 } from '@auth0/auth0-react';

import "monday-ui-react-core/tokens";
import '../../App.css'; // Import your CSS file

const AdminDashboard = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <Router>
      <div className="app-container">
        {/* Navbar */}
        <Navbar />

        <div className="content-container">
          {/* Left Navbar */}
          <LeftNavbar />

          {/* Main Section */}
          {isAuthenticated && (
            <div className="main-section">
              <h1>Welcome to Admin Dashboard</h1>
              <Routes>
                <Route path="/" element={<Admin />} />
                {/* Add more routes for Admin as needed */}
              </Routes>
            </div>
          )}

          {!isAuthenticated && (
            // If the user is not authenticated, show the login button
            <h1>Click on Login Button to access</h1>
          )}
        </div>
      </div>
    </Router>
  );
};

export default AdminDashboard;
