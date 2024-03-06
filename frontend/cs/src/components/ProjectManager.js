// ProjectManager.js

// Import React library
import React from 'react';

// Import custom components for ProjectManager content
import ApprovedTeamTable from './ProjectManagerContent/ApprovedTeamTable';
import ResourceTable from './ProjectManagerContent/ResourceTable';
import ProjectUpdateTable from './ProjectManagerContent/ProjectUpdateTable';
import ClientMeetingTable from './ProjectManagerContent/ClientMeetingTable';

// Functional component for the ProjectManager page
const ProjectManager = () => {
  return (
    <div>
      {/* Include other components or sections as needed */}
      
      {/* Approved Team Table component */}
      <ApprovedTeamTable />

      {/* Resource Table component */}
      <ResourceTable />

      {/* Project Update Table component */}
      <ProjectUpdateTable />

      {/* Client Meeting Table component */}
      <ClientMeetingTable />

      {/* Include other components or sections as needed */}
    </div>
  );
};

// Export the ProjectManager component
export default ProjectManager;
