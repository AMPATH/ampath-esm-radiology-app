import React, { useCallback } from 'react';
import { Button } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { showModal, type Order } from '@openmrs/esm-framework';
import styles from './actions.scss';

interface RejectRadiologyRequestActionProps {
  order: Order;
}

const RejectRadiologyRequestAction: React.FC<RejectRadiologyRequestActionProps> = ({ order }) => {
  const { t } = useTranslation();
  const unsupportedStatuses = ['COMPLETED', 'DECLINED'];

  const launchRejectLabRequestModal = useCallback(() => {
    const dispose = showModal('reject-radiology-request-modal', {
      closeModal: () => dispose(),
      order,
    });
  }, [order]);

  return (
    <Button
      kind="danger--tertiary"
      className={styles.actionRejectButton}
      disabled={unsupportedStatuses.includes(order.fulfillerStatus)}
      key={order.uuid}
      size="sm"
      onClick={launchRejectLabRequestModal}
    >
      {t('rejectRadiologyRequest', 'Reject radiology request')}
    </Button>
  );
};

export default RejectRadiologyRequestAction;
