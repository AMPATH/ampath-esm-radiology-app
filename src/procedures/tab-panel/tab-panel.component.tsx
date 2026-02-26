import React from 'react';
import { Button, Search, Table, TableBody, TableHead, TableHeader, TableRow } from '@carbon/react';
import { Renew } from '@carbon/react/icons';

import styles from './tab-panel.module.scss';
import OrdersDataTable from '../../orders-table/orders-data-table.component';

interface TabPanelProps {
  title: string;
  status: string;
}

const TabPanelComponent: React.FC<TabPanelProps> = ({ title, status }) => {
  return (
    <>
      <div>
        <div className={styles.headerContainer}>
          <div>
            <h4 className={styles.title}>{title}</h4>
          </div>

          <div>
            <span className={styles.refresh}>Refresh</span>
            <Renew size={20} color="blue" />
          </div>
        </div>
        <OrdersDataTable status={status} />
      </div>
    </>
  );
};

export default TabPanelComponent;
