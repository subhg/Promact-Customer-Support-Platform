import React from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'; // Import Tabs components from react-tabs
import 'react-tabs/style/react-tabs.css'; // Import default styles from react-tabs
import AuditHistoryTable from './AuditorContent/AuditHistoryTable';
import ClientFeedbackTable from './ClientContent/ClientFeedbackTable';
import PhasesTable from './AuditorContent/PhasesTable';
import SprintTable from './AuditorContent/SprintTable';
import ResourceTable from './ProjectManagerContent/ResourceTable';

const Client = () => {
  const handleUserSubmit = (addedUser) => {
    // Handle the user submission logic here
    console.log('User submitted in Client:', addedUser);
  };

  return (
    <>
      <Tabs>
        <TabList>
          <Tab>AuditHistory</Tab>
          <Tab>Feedback</Tab>
          <Tab>Phases</Tab>
          <Tab>Sprint</Tab>
          <Tab>Resource</Tab>
        </TabList>
        <div>
          <TabPanel>
            <AuditHistoryTable />
          </TabPanel>
          <TabPanel>
            <ClientFeedbackTable/>
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
        </div>
      </Tabs>
    </>
  );
};

export default Client;
