// ProjectManager.js

// Import React library
import React from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'; // Import Tabs components from react-tabs
import 'react-tabs/style/react-tabs.css'; // Import default styles from react-tabs

// Import custom components for ProjectManager content
import ApprovedTeamTable from '../components/AllTablesAndForms/ApprovedTeamTable';
import ResourceTable from '../components/AllTablesAndForms/ResourceTable';
import ProjectUpdateTable from '../components/AllTablesAndForms/ProjectUpdateTable';
import ClientMeetingTable from '../components/AllTablesAndForms/ClientMeetingTable';
import ProjectBudgetTable from '../components/AllTablesAndForms/ProjectBudgetTable';
import AllProjectTable from '../components/AllTablesAndForms/AllProjectTable';
import AuditHistoryTable from '../components/AllTablesAndForms/AuditHistoryTable';
import ClientFeedbackTable from '../components/AllTablesAndForms/ClientFeedbackTable';
import EscalationMatrixTable from '../components/AllTablesAndForms/EscalationMatrixTable';
import PhasesTable from '../components/AllTablesAndForms/PhasesTable';
import SprintTable from '../components/AllTablesAndForms/SprintTable';
import RiskProfilingForm from '../components/AllTablesAndForms/RiskProfilingForm';
import StackandScope from '../components/AllTablesAndForms/StackandScope';
import StakeholderTable from '../components/AllTablesAndForms/StakeholderTable';
import VersionHistoryTable from '../components/AllTablesAndForms/VersionHistoryTable';
import DownloadPdf from '../components/AllTablesAndForms/DownloadPdf';
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
        <DownloadPdf/>
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
