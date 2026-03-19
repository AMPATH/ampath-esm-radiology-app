import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@carbon/react';
import { showModal, type Order } from '@openmrs/esm-framework';
import styles from './actions.scss';
import { type BillStatus } from '../types';

interface PickRadiologyRequestActionMenuProps {
  order: Order;
  billStatus: BillStatus;
}

const PickupRadiologyRequestAction: React.FC<PickRadiologyRequestActionMenuProps> = ({ order, billStatus }) => {
  const { t } = useTranslation();
  const unsupportedStatuses = ['COMPLETED', 'DECLINED', 'IN_PROGRESS', 'ON_HOLD'];

  const launchModal = useCallback(() => {
    const dispose = showModal('pickup-radiology-request-modal', {
      closeModal: () => dispose(),
      order,
    });
  }, [order]);

  return billStatus === 'PAID' || billStatus === 'POSTED' ? (
    <Button
      className={styles.actionButton}
      disabled={unsupportedStatuses.includes(order.fulfillerStatus)}
      size="sm"
      kind="primary"
      key={order.uuid}
      onClick={launchModal}
    >
      {t('pickRadiologyRequest', 'Pick radiology request')}
    </Button>
  ) : null;
};

export default PickupRadiologyRequestAction;
