import React, { useState } from 'react';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { XrayPictogram, PageHeader, useDefineAppContext } from '@openmrs/esm-framework';
import { type DateFilterContext } from './types';
import styles from './radiology-dashboard.scss';
import RadiologySummaryTiles from './summary/radiology-summary-tiles.component';
import RadiologyOrdersTabs from './tabs/radiology-tabs.component';

const RadiologyDashboard: React.FC = () => {
  const { t } = useTranslation();
  const [dateRange, setDateRange] = useState<[Date, Date]>([dayjs().startOf('day').toDate(), new Date()]);
  useDefineAppContext<DateFilterContext>('radiology-date-filter', { dateRange, setDateRange });

  return (
    <div>
      <PageHeader
        illustration={<XrayPictogram />}
        title={t('radiologyAndImaging', 'Radiology & Imaging')}
        className={styles.pageHeader}
      />
      <div>
        <RadiologySummaryTiles />
        <RadiologyOrdersTabs />
      </div>
    </div>
  );
};

export default RadiologyDashboard;
