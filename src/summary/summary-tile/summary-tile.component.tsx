import React from 'react';
import { Layer, Tile } from '@carbon/react';
import styles from './summary-tile.scss';

interface SummaryTileProps {
  label: string;
  value: number;
  headerLabel: string;
  children?: React.ReactNode;
}

const SummaryTile: React.FC<SummaryTileProps> = ({ label, value, headerLabel, children }) => {
  return (
    <Layer>
      <Tile className={styles.tileContainer}>
        <div className={styles.tileHeader}>
          <div className={styles.headerLabelContainer}>
            <label className={styles.headerLabel}>{headerLabel}</label>
            {children}
          </div>
        </div>
        <div>
          <label className={styles.totalsLabel}>{label}</label>
          <p className={styles.totalsValue}>{value}</p>
        </div>
      </Tile>
    </Layer>
  );
};

export default SummaryTile;
