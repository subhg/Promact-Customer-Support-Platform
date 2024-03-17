import React from 'react';
import { Link } from 'react-router-dom';
import './AuditorLeftNavbar.css'; // Import the CSS file

const AuditorLeftNavbar = () => {
  return (
    <div className="auditor-left-navbar"> {/* Apply the class name */}
      <ul>
        <li>
          <Link to="">+New Project</Link>
        </li>
        <li>
          <Link to="">Projects</Link>
        </li>
        <li>
          <Link to="">Reports</Link>
        </li>
        {/* Add other auditor-specific links here */}
      </ul>
    </div>
  );
};

export default AuditorLeftNavbar;
