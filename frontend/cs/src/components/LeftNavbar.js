import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom if you're using routing
import './LeftNavbar.css'

const LeftNavbar = () => {
  return (
    <div className="left-navbar">
      <ul>
       <li>
          <Link className="projectmanager"to="/ProjectManager">Project Manager</Link>
        </li>
        <li>
          <Link to="/Client">Client</Link>
        </li>
      </ul>
    </div>
  );
};

export default LeftNavbar;
