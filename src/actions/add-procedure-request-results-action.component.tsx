import React from 'react';
import { Button } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { AddIcon, launchWorkspace, useConfig } from '@openmrs/esm-framework';
import { type Order } from '@openmrs/esm-framework';
import { type Config } from '../config-schema';
import styles from './actions.scss';

interface AddProcedureRequestResultsActionProps {
  order: Order;
}

const AddProcedureRequestResultsAction: React.FC<AddProcedureRequestResultsActionProps> = ({ order }) => {
  const { t } = useTranslation();
  const { procedureOrderTypeUuid } = useConfig<Config>();

  const launchTestResultsWorkspace = () => {
    launchWorkspace('post-procedure-form-workspace', {
      patient: order.patient,
      order
    });
  };

  return (
    <Button
      className={styles.actionButton}
      kind="primary"
      renderIcon={() => <AddIcon className={styles.actionButtonIcon} />}
      iconDescription={t('addProcedureResult', 'Add procedure results')}
      onClick={launchTestResultsWorkspace}
      size="sm"
    >
      {t('addProcedureResult', 'Add procedure results')}
    </Button>
  );
};

export default AddProcedureRequestResultsAction;
