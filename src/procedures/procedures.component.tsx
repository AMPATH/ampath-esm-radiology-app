import { Button, Tab, TabList, TabPanel, TabPanels, Tabs } from '@carbon/react';
import React from 'react';
import TabPanelComponent from './tab-panel/tab-panel.component';
import styles from './procedures.scss';
import { Add } from '@carbon/react/icons';

interface ProceduresProps {}

const Procedures: React.FC<ProceduresProps> = () => {
  return (
    <>
      <div className={styles.headerContainer}>
        <h3>Procedures</h3>
        <Button renderIcon={Add}>Add Procedure</Button>
      </div>
      <Tabs>
        <TabList contained scrollDebounceWait={200}>
          <Tab>Procedures Ordered</Tab>
          <Tab>Worklist</Tab>
          <Tab>Referred out</Tab>
          <Tab>Not Done</Tab>
          <Tab>Completed</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <TabPanelComponent title="Ordered Procedures" />
          </TabPanel>
          <TabPanel>
            <TabPanelComponent title="Worklist" />
          </TabPanel>
          <TabPanel>
            <TabPanelComponent title="Referred Out" />
          </TabPanel>
          <TabPanel>
            <TabPanelComponent title="Not Done" />
          </TabPanel>
          <TabPanel>
            <TabPanelComponent title="Completed" />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default Procedures;
