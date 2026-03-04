import React from 'react';
import OrdersDataTable from '../orders-table/orders-data-table.component';

const CompletedRequestsTable: React.FC = () => {
  return <OrdersDataTable status="COMPLETED" />;
};

export default CompletedRequestsTable;
