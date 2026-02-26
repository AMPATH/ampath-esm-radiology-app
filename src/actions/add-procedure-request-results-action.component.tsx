import React from 'react';
import { Button } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { mutate } from 'swr';
import { AddIcon, launchWorkspace2, restBaseUrl, useConfig } from '@openmrs/esm-framework';
import { type Order } from '@openmrs/esm-framework';
import { type Config } from '../config-schema';
import styles from './actions.scss';

interface AddProcedureRequestResultsActionProps {
  order: Order;
}

const AddProcedureRequestResultsAction: React.FC<AddProcedureRequestResultsActionProps> = ({ order }) => {
  const { t } = useTranslation();
  const { procedureOrderTypeUuid } = useConfig<Config>();

  const invalidateProcedureOrders = () => {
    mutate(
      (key) => typeof key === 'string' && key.startsWith(`${restBaseUrl}/order?orderTypes=${procedureOrderTypeUuid}`),
    );
  };

  const launchTestResultsWorkspace = () => {
    launchWorkspace2('lab-app-test-results-form-workspace', {
      patient: order.patient,
      order,
      invalidateProcedureOrders,
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
