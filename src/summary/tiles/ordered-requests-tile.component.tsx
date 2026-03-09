import React from 'react';
import { useTranslation } from 'react-i18next';
import SummaryTile from '../summary-tile/summary-tile.component';
import { useRadiologyOrders } from '../../resources/radiology.resources';

const OrderedRequestsTile = () => {
  const { t } = useTranslation();
  const { orders } = useRadiologyOrders("");

  return (
    <SummaryTile
      label={t('orders', 'Orders')}
      value={orders?.length}
      headerLabel={t('radiologyOrdered', 'Radiology ordered')}
    />
  );
};

export default OrderedRequestsTile;
