import React from 'react';
import { Link } from 'react-router-dom';
import './ProjectManagerLeftNavbar.css'

const ProjectManagerLeftNavbar = () => {
  return (
    <div className="project-manager-left-navbar"> {/* Apply the class name */}
      <ul>
       <li>
        <Link to="">Project</Link>
       </li>

        <li>
          <Link to="">Dashboard</Link>
        </li>

        <li>
        <Link to="">Profile</Link>
        </li>

        <li>
        <Link to="">Settings</Link>
        </li>
        {/* Add other auditor-specific links here */}
      </ul>
    </div>
  );
};

export default ProjectManagerLeftNavbar;
