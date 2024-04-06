import React from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'; // Import Tabs components from react-tabs
import 'react-tabs/style/react-tabs.css'; // Import default styles from react-tabs

import CreateAuditorProjectForm from '../components/AllTablesAndForms/CreateAuditorProjectForm';
import AuditorProjectFormTable from '../components/AllTablesAndForms/AuditorProjectFormTable';
import AuditHistoryTable from '../components/AllTablesAndForms/AuditHistoryTable'; 
import VersionHistoryTable from '../components/AllTablesAndForms/VersionHistoryTable';
import EscalationMatrixTable from '../components/AllTablesAndForms/EscalationMatrixTable';
import AllProjectTable from '../components/AllTablesAndForms/AllProjectTable';
import StakeholderTable from '../components/AllTablesAndForms/StakeholderTable';
import StackandScope from '../components/AllTablesAndForms/StackandScope';
import PhasesTable from '../components/AllTablesAndForms/PhasesTable';
import ProjectBudgetTable from '../components/AllTablesAndForms/ProjectBudgetTable';
import SprintTable from '../components/AllTablesAndForms/SprintTable';
import RiskProfilingForm from '../components/AllTablesAndForms/RiskProfilingForm';
import ClientFeedbackTable from '../components/AllTablesAndForms/ClientFeedbackTable';
import ClientMeetingTable from '../components/AllTablesAndForms/ClientMeetingTable';
import ResourceTable from '../components/AllTablesAndForms/ResourceTable';
import ProjectUpdateTable from '../components/AllTablesAndForms/ProjectUpdateTable';
import ApprovedTeamTable from '../components/AllTablesAndForms/ApprovedTeamTable';
import DownloadPdf from '../components/AllTablesAndForms/DownloadPdf';

const Auditor = () => {
  const handleUserSubmit = (addedUser) => {
    // Handle the user submission logic here
    console.log('User submitted in Auditor:', addedUser);
  };

  return (
    <>
      <Tabs>
        <TabList>
          <Tab>Create Project</Tab>
          <Tab>Project </Tab>
          <Tab>All Project</Tab>
          <Tab>Project Updates</Tab>
          <Tab>Stakeholder</Tab>
          <Tab>Audit History</Tab>
          <Tab>VersionHistory</Tab>
          <Tab>EscalationMatrix</Tab>
          <Tab>StackandScope</Tab>
          <Tab>Phases</Tab>
          <Tab>ProjectBudget</Tab>
          <Tab>Sprint</Tab>
          <Tab>RiskProfilingForm</Tab>
          <Tab>ClientFeedback</Tab>
          <Tab>ClientMeeting</Tab>
          <Tab>Resource</Tab>
          <Tab>Approved Team</Tab>
          <Tab>Version History</Tab>
        </TabList>
        <div>
          <DownloadPdf/>
          <TabPanel>
            <CreateAuditorProjectForm onUserSubmit={handleUserSubmit} />
          </TabPanel>
          <TabPanel>
            <AuditorProjectFormTable />
          </TabPanel>
          <TabPanel>
            <AllProjectTable/>
          </TabPanel>
          <TabPanel>
            <ProjectUpdateTable/>
          </TabPanel>
          <TabPanel>
            <StakeholderTable/>
          </TabPanel>
          <TabPanel>
            <AuditHistoryTable />
          </TabPanel>
          <TabPanel>
            <VersionHistoryTable />
          </TabPanel>
          <TabPanel>
            <EscalationMatrixTable type="operational" />
            <EscalationMatrixTable type="financial" />
            <EscalationMatrixTable type="technical" />
          </TabPanel>
          <TabPanel>
            <StackandScope/>
          </TabPanel>
          <TabPanel>
            <PhasesTable/>
          </TabPanel>
          <TabPanel>
            <ProjectBudgetTable/>
          </TabPanel>
          <TabPanel>
            <SprintTable/>
          </TabPanel>
          <TabPanel>
            <RiskProfilingForm/>
          </TabPanel>
          <TabPanel>
            <ClientFeedbackTable/>
          </TabPanel>
          <TabPanel>
            <ClientMeetingTable/>
          </TabPanel>
          <TabPanel>
            <ResourceTable/>
          </TabPanel>
         <TabPanel>
          <ApprovedTeamTable/>
         </TabPanel>
          <TabPanel>
            <VersionHistoryTable/>
          </TabPanel>
        </div>
      </Tabs>
    </>
  );
};

export default Auditor;
