import React from 'react';
import OrdersDataTable from '../orders-table/orders-data-table.component';

const DeclinedRequestsTable: React.FC = () => {
  return <OrdersDataTable status="DECLINED" />;
};

export default DeclinedRequestsTable;
