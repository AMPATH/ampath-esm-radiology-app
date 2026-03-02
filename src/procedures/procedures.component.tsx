import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@carbon/react';
import React from 'react';
import TabPanelComponent from './tab-panel/tab-panel.component';
import styles from './procedures.scss';

interface ProceduresProps {}

const Procedures: React.FC<ProceduresProps> = () => {
  return (
    <>
      <div className={styles.headerContainer}>
        <h3>Procedures</h3>
      </div>
      <Tabs>
        <TabList contained>
          <Tab>Procedures Ordered</Tab>
          <Tab>In progress</Tab>
          <Tab>Completed</Tab>
          <Tab>Declined</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <TabPanelComponent title="Procedures ordered" status=''/>
          </TabPanel>
          <TabPanel>
            <TabPanelComponent title="In progress" status='IN_PROGRESS'/>
          </TabPanel>
          <TabPanel>
            <TabPanelComponent title="Completed" status='COMPLETED'/>
          </TabPanel>
          <TabPanel>
            <TabPanelComponent title="Declined" status='DECLINED'/>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default Procedures;
