import React from 'react';
import { useTranslation } from 'react-i18next';
import { useProcedureOrders } from '../../resources/procedures.resources';
import SummaryTile from '../summary-tile/summary-tile.component';

const DeclinedRequestsTile = () => {
  const { t } = useTranslation();
   const { orders } = useProcedureOrders("DECLINED");

  return (
    <SummaryTile
      label={t('declined', 'Declined')}
      value={orders?.length}
      headerLabel={t('proceduresDeclined', 'Procedures declined')}
    />
  );
};

export default DeclinedRequestsTile;
