// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LeftNavbar from './components/LeftNavbar';
import Client from './components/Client';
import ProjectManager from './components/ProjectManager';
import { useAuth0 } from '@auth0/auth0-react';

import "monday-ui-react-core/tokens";
import './App.css'; // Import your CSS file

const App = () => {
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
              <h1>Welcome to Customer Support Platform</h1>
              <Routes>
                <Route path="/ProjectManager" element={<ProjectManager />} />
                <Route path="/Client" element={<Client />} />
                {/* Add more routes as needed */}
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

export default App;
