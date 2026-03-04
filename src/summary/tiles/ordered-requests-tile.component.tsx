import React from 'react';
import { useTranslation } from 'react-i18next';
import SummaryTile from '../summary-tile/summary-tile.component';
import { useProcedureOrders } from '../../resources/procedures.resources';

const OrderedRequestsTile = () => {
  const { t } = useTranslation();
  const { orders } = useProcedureOrders("");

  return (
    <SummaryTile
      label={t('orders', 'Orders')}
      value={orders?.length}
      headerLabel={t('proceduresOrdered', 'Procedures ordered')}
    />
  );
};

export default OrderedRequestsTile;
