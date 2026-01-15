import React from 'react';
import { Button, Search, Table, TableHeader, TableRow } from '@carbon/react';
import { Renew } from '@carbon/react/icons';

import styles from './tab-panel.module.scss';

interface TabPanelProps {
  title: string;
}

const TabPanelComponent: React.FC<TabPanelProps> = ({ title }) => {
  const headers = [
    {
      key: 'name',
      header: 'Name',
    },
    {
      key: 'age',
      header: 'Age',
    },
    {
      key: 'sex',
      header: 'Sex',
    },
    {
      key: 'totalOrders',
      header: 'Total Orders',
    },
  ];
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
        <div className={styles.search}>
          <Search
            closeButtonLabelText="Clear search input"
            id="search-default-1"
            labelText="Label text"
            placeholder="Placeholder text"
            size="md"
            type="search"
          />
        </div>
        <Table>
          <TableRow>
            {headers.map((header) => (
              <TableHeader>{header.header}</TableHeader>
            ))}
          </TableRow>
        </Table>
      </div>
    </>
  );
};

export default TabPanelComponent;
