import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LeftNavbar from './components/LeftNavbar';
import Project from './components/Project';
import ProjectManager from './components/ProjectManager';

import "monday-ui-react-core/tokens";
import './App.css'; // Import your CSS file

const App = () => {
  return (
    <Router>
      <div className="app-container">
        {/* Navbar */}
        <Navbar />

        <div className="content-container">
          {/* Left Navbar */}
          <LeftNavbar />

          {/* Main Section */}
          <div className="main-section">
            <Routes>
              <Route path="/Project" element={<Project />} />
              <Route path="/ProjectManager" element={<ProjectManager />} />
              {/* Render YourComponent when the ProjectManager route is active */}
              {/* Add more routes as needed */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
