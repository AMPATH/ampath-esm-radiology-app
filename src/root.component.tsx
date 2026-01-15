import React from 'react';
import { useTranslation } from 'react-i18next';
import Resources from './resources/resources.component';
import styles from './root.scss';
import Procedures from './procedures/procedures.component';

const Root: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <Procedures />
    </div>
  );
};

export default Root;
