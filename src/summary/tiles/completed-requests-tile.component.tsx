import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRadiologyOrders } from '../../resources/radiology.resources';
import SummaryTile from '../summary-tile/summary-tile.component';

const CompletedRequestsTile = () => {
  const { t } = useTranslation();
   const { orders } = useRadiologyOrders("COMPLETED");

  return (
    <SummaryTile
      label={t('completed', 'Completed')}
      value={orders?.length}
      headerLabel={t('radiologyCompleted', 'Radiology completed')}
    />
  );
};

export default CompletedRequestsTile;
