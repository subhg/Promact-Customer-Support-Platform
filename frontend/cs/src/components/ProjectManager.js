// ProjectManager.js

// Import React library
import React from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'; // Import Tabs components from react-tabs
import 'react-tabs/style/react-tabs.css'; // Import default styles from react-tabs

// Import custom components for ProjectManager content
import ApprovedTeamTable from './ProjectManagerContent/ApprovedTeamTable';
import ResourceTable from './ProjectManagerContent/ResourceTable';
import ProjectUpdateTable from './ProjectManagerContent/ProjectUpdateTable';
import ClientMeetingTable from './ProjectManagerContent/ClientMeetingTable';
import ProjectBudgetTable from './AuditorContent/ProjectBudgetTable';
import AllProjectTable from './AuditorContent/AllProjectTable';
import AuditHistoryTable from './AuditorContent/AuditHistoryTable';
import ClientFeedbackTable from './ClientContent/ClientFeedbackTable';
import EscalationMatrixTable from './AuditorContent/EscalationMatrixTable';
import PhasesTable from './AuditorContent/PhasesTable';
import SprintTable from './AuditorContent/SprintTable';
import RiskProfilingForm from './AuditorContent/RiskProfilingForm';
import StackandScope from './AuditorContent/StackandScope';
import StakeholderTable from './AuditorContent/StakeholderTable';
import VersionHistoryTable from './AuditorContent/VersionHistoryTable';

// Functional component for the ProjectManager page
const ProjectManager = () => {
  return (
    <Tabs>
      <TabList>
        <Tab>All Project</Tab>
        <Tab>Audit History</Tab>
        <Tab>Approved Team</Tab>
        <Tab>Resource</Tab>
        <Tab>Project Update</Tab>
        <Tab>Client Meeting</Tab>
        <Tab>Project Budget</Tab>
        <Tab>ClientFeedback</Tab>
        <Tab>ClientMeeting</Tab>
        <Tab>EscalationMatrix</Tab>
        <Tab>Phases</Tab>
        <Tab>Sprint</Tab>
        <Tab>Risk Profiling</Tab>
        <Tab>Stack&Scope</Tab>
        <Tab>Stakeholders</Tab>
        <Tab>Version History</Tab>
      </TabList>
      <div>
        <TabPanel>
          <AllProjectTable/>
        </TabPanel>
        <TabPanel>
          <AuditHistoryTable/>
        </TabPanel>
        <TabPanel>
          <ApprovedTeamTable />
        </TabPanel>
        <TabPanel>
          <ResourceTable />
        </TabPanel>
        <TabPanel>
          <ProjectUpdateTable />
        </TabPanel>
        <TabPanel>
          <ClientMeetingTable />
        </TabPanel>
        <TabPanel>
          <ProjectBudgetTable />
        </TabPanel>
        <TabPanel>
          <ClientFeedbackTable/>
        </TabPanel>
        <TabPanel>
          <ClientMeetingTable />
        </TabPanel>
        <TabPanel>
            <EscalationMatrixTable type="operational" />
            <EscalationMatrixTable type="financial" />
            <EscalationMatrixTable type="technical" />
        </TabPanel>
        <TabPanel>
          <PhasesTable/>
        </TabPanel>
        <TabPanel>
          <SprintTable/>
        </TabPanel>
        <TabPanel>
          <RiskProfilingForm/>
        </TabPanel>
        <TabPanel>
          <StackandScope/>
        </TabPanel>
        <TabPanel>
          <StakeholderTable/>
        </TabPanel>
        <TabPanel>
          <VersionHistoryTable/>
        </TabPanel>
      </div>
    </Tabs>
  );
};

// Export the ProjectManager component
export default ProjectManager;
