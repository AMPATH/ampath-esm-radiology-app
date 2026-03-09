import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRadiologyOrders } from '../../resources/radiology.resources';
import SummaryTile from '../summary-tile/summary-tile.component';

const DeclinedRequestsTile = () => {
  const { t } = useTranslation();
   const { orders } = useRadiologyOrders("DECLINED");

  return (
    <SummaryTile
      label={t('declined', 'Declined')}
      value={orders?.length}
      headerLabel={t('radiologyDeclined', 'Radiology declined')}
    />
  );
};

export default DeclinedRequestsTile;
