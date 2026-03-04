import React, { useState } from 'react';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { Assessment1Pictogram, PageHeader, useDefineAppContext } from '@openmrs/esm-framework';
import { type DateFilterContext } from './types';
import styles from './procedures-dashboard.scss';
import ProcedureSummaryTiles from './summary/procedure-summary-tiles.component';
import ProcedureOrdersTabs from './tabs/procedure-tabs.component';

const ProceduresDashboard: React.FC = () => {
  const { t } = useTranslation();
  const [dateRange, setDateRange] = useState<[Date, Date]>([dayjs().startOf('day').toDate(), new Date()]);
  useDefineAppContext<DateFilterContext>('procedures-date-filter', { dateRange, setDateRange });

  return (
    <div>
      <PageHeader
        illustration={<Assessment1Pictogram />}
        title={t('procedures', 'Procedures')}
        className={styles.pageHeader}
      />
      <div>
        <ProcedureSummaryTiles />
        <ProcedureOrdersTabs />
      </div>
    </div>
  );
};

export default ProceduresDashboard;
