// ProjectManager.js
import React from 'react';
import ApprovedTeamTable from './ProjectManagerContent/ApprovedTeamTable';
import ResourceTable from './ProjectManagerContent/ResourceTable';
import ProjectUpdateTable from './ProjectManagerContent/ProjectUpdateTable';
import ClientMeetingTable from './ProjectManagerContent/ClientMeetingTable';

const ProjectManager = () => {
  return (
    <div>
      {/* Your other components */}
      <ApprovedTeamTable />
      <ResourceTable/>
      <ProjectUpdateTable/>
      <ClientMeetingTable/>
      {/* Other components */}
    </div>
  );
};

export default ProjectManager;
