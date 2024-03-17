// Admin.js
import React from 'react';
import CreateUserForm from './AdminContent/CreateUserForm';
import ProjectBudgetTable from './AuditorContent/ProjectBudgetTable';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'; // Import Tabs components from react-tabs
import 'react-tabs/style/react-tabs.css'; // Import default styles from react-tabs
import AllProjectTable from './AuditorContent/AllProjectTable';
import AuditHistoryTable from './AuditorContent/AuditHistoryTable';
import AuditorProjectFormTable from './AuditorContent/AuditorProjectFormTable';
import CreateAuditorProjectForm from './AuditorContent/CreateAuditorProjectForm';
import ClientFeedbackTable from './ClientContent/ClientFeedbackTable';
import ClientMeetingTable from './ProjectManagerContent/ClientMeetingTable';
import EscalationMatrixTable from './AuditorContent/EscalationMatrixTable';
import PhasesTable from './AuditorContent/PhasesTable';
import SprintTable from './AuditorContent/SprintTable';
import ResourceTable from './ProjectManagerContent/ResourceTable';
import ProjectUpdateTable from './ProjectManagerContent/ProjectUpdateTable';
import ApprovedTeamTable from './ProjectManagerContent/ApprovedTeamTable';
import RiskProfilingForm from './AuditorContent/RiskProfilingForm';
import StackandScope from './AuditorContent/StackandScope';
import StakeholderTable from './AuditorContent/StakeholderTable';
import VersionHistoryTable from './AuditorContent/VersionHistoryTable';

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
