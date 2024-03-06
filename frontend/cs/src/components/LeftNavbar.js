import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom if you're using routing
import './LeftNavbar.css'

const LeftNavbar = () => {
  return (
    <div className="left-navbar">
      <ul>
        <li>
          <Link  className="newproject"to="/NewProject">
            New Project</Link>
        </li>
        <li>
          <Link to="/Project">Project </Link>
        </li>
        <li>
          <Link className="projectmanager"to="/ProjectManager">Project Manager</Link>
        </li>
        {/* Add more links as needed */}
      </ul>
    </div>
  );
};

export default LeftNavbar;
