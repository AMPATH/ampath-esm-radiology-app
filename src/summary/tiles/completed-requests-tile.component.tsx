import React from 'react';
import { useTranslation } from 'react-i18next';
import { useProcedureOrders } from '../../resources/procedures.resources';
import SummaryTile from '../summary-tile/summary-tile.component';

const CompletedRequestsTile = () => {
  const { t } = useTranslation();
   const { orders } = useProcedureOrders("COMPLETED");

  return (
    <SummaryTile
      label={t('completed', 'Completed')}
      value={orders?.length}
      headerLabel={t('proceduresCompleted', 'Procedures completed')}
    />
  );
};

export default CompletedRequestsTile;
