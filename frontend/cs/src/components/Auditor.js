import React from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'; // Import Tabs components from react-tabs
import 'react-tabs/style/react-tabs.css'; // Import default styles from react-tabs

import CreateAuditorProjectForm from './AuditorContent/CreateAuditorProjectForm';
import AuditorProjectFormTable from './AuditorContent/AuditorProjectFormTable';
import AuditHistoryTable from './AuditorContent/AuditHistoryTable'; 
import VersionHistoryTable from './AuditorContent/VersionHistoryTable';
import EscalationMatrixTable from './AuditorContent/EscalationMatrixTable';
//import ApprovedTeamTable from './ProjectManagerContent/ApprovedTeamTable'; // Import ApprovedTeamTable component
import AllProjectTable from './AuditorContent/AllProjectTable';
import StakeholderTable from './AuditorContent/StakeholderTable';
import StackandScope from './AuditorContent/StackandScope';
import PhasesTable from './AuditorContent/PhasesTable';
import ProjectBudgetTable from './AuditorContent/ProjectBudgetTable';
import SprintTable from './AuditorContent/SprintTable';
import RiskProfilingForm from './AuditorContent/RiskProfilingForm';
import ClientFeedbackTable from './ClientContent/ClientFeedbackTable';
import ClientMeetingTable from './ProjectManagerContent/ClientMeetingTable';
import ResourceTable from './ProjectManagerContent/ResourceTable';
import ProjectUpdateTable from './ProjectManagerContent/ProjectUpdateTable';
import ApprovedTeamTable from './ProjectManagerContent/ApprovedTeamTable';

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
