// LeftNavbar.js

import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom if you're using routing
import './LeftNavbar.css';

/**
 * LeftNavbar component represents the left navigation bar.
 * It contains links to different sections of the application.
 */
const LeftNavbar = () => {
  return (
    <div className="left-navbar">
      <ul>
        {/* Project Manager link */}
        <li>
          <Link className="projectmanager" to="/ProjectManager">
            Project Manager
          </Link>
        </li>
        {/* Client link */}
        <li>
          <Link to="/Client">Client</Link>
        </li>
      </ul>
    </div>
  );
};

export default LeftNavbar;
