import { Button, Tab, TabList, TabPanel, TabPanels, Tabs } from '@carbon/react';
import React from 'react';
import TabPanelComponent from './tab-panel/tab-panel.component';
import styles from './procedures.scss';
import { Add } from '@carbon/react/icons';
import OrdersDataTable from '../orders-table/orders-data-table.component';

interface ProceduresProps {}

const Procedures: React.FC<ProceduresProps> = () => {
  return (
    <>
      <div className={styles.headerContainer}>
        <h3>Procedures</h3>
        <Button renderIcon={Add}>Add Procedure</Button>
      </div>
      <Tabs>
        <TabList contained>
          <Tab>Procedures Ordered</Tab>
          <Tab>Worklist</Tab>
          <Tab>Referred out</Tab>
          <Tab>Not Done</Tab>
          <Tab>Completed</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <TabPanelComponent title="Ordered Procedures" status=''/>
          </TabPanel>
          <TabPanel>
            <TabPanelComponent title="Worklist" status='IN_PROGRESS'/>
          </TabPanel>
          <TabPanel>
            <TabPanelComponent title="Referred Out" status='EXCEPTION'/>
          </TabPanel>
          <TabPanel>
            <TabPanelComponent title="Not Done" status='DECLINED'/>
          </TabPanel>
          <TabPanel>
            <TabPanelComponent title="Completed" status='COMPLETED'/>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default Procedures;
