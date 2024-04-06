// Admin.js
import React from 'react';
import CreateUserForm from '../components/AllTablesAndForms/CreateUserForm';
import ProjectBudgetTable from '../components/AllTablesAndForms/ProjectBudgetTable';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'; // Import Tabs components from react-tabs
import 'react-tabs/style/react-tabs.css'; // Import default styles from react-tabs
import AllProjectTable from '../components/AllTablesAndForms/AllProjectTable';
import AuditHistoryTable from '../components/AllTablesAndForms/AuditHistoryTable';
import AuditorProjectFormTable from '../components/AllTablesAndForms/AuditorProjectFormTable';
import CreateAuditorProjectForm from '../components/AllTablesAndForms/CreateAuditorProjectForm';
import ClientFeedbackTable from '../components/AllTablesAndForms/ClientFeedbackTable';
import ClientMeetingTable from '../components/AllTablesAndForms/ClientMeetingTable';
import EscalationMatrixTable from '../components/AllTablesAndForms/EscalationMatrixTable';
import PhasesTable from '../components/AllTablesAndForms/PhasesTable';
import SprintTable from '../components/AllTablesAndForms/SprintTable';
import ResourceTable from '../components/AllTablesAndForms/ResourceTable';
import ProjectUpdateTable from '../components/AllTablesAndForms/ProjectUpdateTable';
import ApprovedTeamTable from '../components/AllTablesAndForms/ApprovedTeamTable';
import RiskProfilingForm from '../components/AllTablesAndForms/RiskProfilingForm';
import StackandScope from '../components/AllTablesAndForms/StackandScope';
import StakeholderTable from '../components/AllTablesAndForms/StakeholderTable';
import VersionHistoryTable from '../components/AllTablesAndForms/VersionHistoryTable';
import DownloadPdf from '../components/AllTablesAndForms/DownloadPdf';


const Admin = () => {
  const handleUserSubmit = (addedUser) => {
    // Handle the user submission logic here
    console.log('User submitted in Admin:', addedUser);
  };

  return (
    <div className="tabs-container"> {/* Apply a class to style the tabs container */}
      <Tabs>
        <TabList>
          <Tab>Create User</Tab>
          <Tab>Create Project</Tab>
          <Tab>Project Details</Tab>
          <Tab>All Projects</Tab>
          <Tab>Project Updates</Tab>
          <Tab>Audit History</Tab>
          <Tab>Project Budget</Tab>
          <Tab>Approved Team</Tab>
          <Tab>ClientFeedback</Tab>
          <Tab>Client Meeting</Tab>
          <Tab>EscalationMatrix</Tab>
          <Tab>Phases</Tab>
          <Tab>Sprint</Tab>
          <Tab>Resource</Tab>
          <Tab>Risk Profiling</Tab>
          <Tab>Stack&Scope</Tab>
          <Tab>Stakeholders</Tab>
          <Tab>Version History</Tab>
        </TabList>
      
        <div className="tab-content">
          <DownloadPdf/>
          <TabPanel>
            <CreateUserForm onUserSubmit={handleUserSubmit} />
          </TabPanel>
          <TabPanel>
            <CreateAuditorProjectForm />
          </TabPanel>
          <TabPanel>
            <AuditorProjectFormTable/>
          </TabPanel>
          <TabPanel>
            <AllProjectTable />
          </TabPanel>
          <TabPanel>
            <ProjectUpdateTable/>
          </TabPanel>
          <TabPanel>
            <AuditHistoryTable />
          </TabPanel>
          <TabPanel>
            <ProjectBudgetTable />
          </TabPanel>
          <TabPanel>
            <ApprovedTeamTable/>
          </TabPanel>
          <TabPanel>
            <ClientFeedbackTable/>
          </TabPanel>
          <TabPanel>
            <ClientMeetingTable/>
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
            <ResourceTable/>
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
    </div>
  );
};

export default Admin;
