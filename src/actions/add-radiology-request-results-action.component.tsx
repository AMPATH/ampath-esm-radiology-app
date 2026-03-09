import React from 'react';
import { Button } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { AddIcon, launchWorkspace, useConfig } from '@openmrs/esm-framework';
import { type Order } from '@openmrs/esm-framework';
import { type Config } from '../config-schema';
import styles from './actions.scss';

interface AddRadiologyRequestResultsActionProps {
  order: Order;
}

const AddRadiologyRequestResultsAction: React.FC<AddRadiologyRequestResultsActionProps> = ({ order }) => {
  const { t } = useTranslation();
  const { radiologyOrderTypeUuid } = useConfig<Config>();

  const launchTestResultsWorkspace = () => {
    launchWorkspace('post-radiology-form-workspace', {
      patient: order.patient,
      order
    });
  };

  return (
    <Button
      className={styles.actionButton}
      kind="primary"
      renderIcon={() => <AddIcon className={styles.actionButtonIcon} />}
      iconDescription={t('addRadiologyResult', 'Add radiology results')}
      onClick={launchTestResultsWorkspace}
      size="sm"
    >
      {t('addRadiologyResult', 'Add radiology results')}
    </Button>
  );
};

export default AddRadiologyRequestResultsAction;
