import React from 'react';
import { Link } from 'react-router-dom';
import './RolewiseLeftNavbar.css'

const AdminLeftNavbar = () => {
  return (
    <div className="left-navbar"> {/* Apply the class name */}
      <ul>
       <li>
        <Link to="/Rep">+New User</Link>
       </li>

        <li>
          <Link to="/">Dashboard</Link>
        </li>

        <li>
        <Link to="">Project</Link>
        </li>
        {/* Add other auditor-specific links here */}
      </ul>
    </div>
  );
};

export default AdminLeftNavbar;
