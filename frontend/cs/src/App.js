// App.js

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Navbar from './components/Navbar';
import LeftNavbar from './components/LeftNavbar';
import AppRoutes from './AppRoutes'; // Import the routes configuration
import { useAuth0 } from '@auth0/auth0-react';
import './App.css';

const App = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <Router>
      <Auth>
        <div className="app-container">
          <Navbar />
          <div className="content-container">
            <LeftNavbar />
            {isAuthenticated && (
              <div className="main-section">
                <AppRoutes /> {/* Render the routes */}
              </div>
            )}
            {!isAuthenticated && (
              <h1>Click on Login Button to access</h1>
            )}
          </div>
        </div>
      </Auth>
    </Router>
  );
};

export default App;
