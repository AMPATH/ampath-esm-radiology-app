import React, { useState } from 'react';
import { Button, Form, ModalBody, ModalFooter, ModalHeader, TextArea, Layer } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { type Order, showNotification, showSnackbar, useAbortController } from '@openmrs/esm-framework';
import { rejectRadiologyOrder, useInvalidateRadiologyOrders } from '../resources/radiology.resources';
import styles from './reject-radiology-request-modal.scss';

interface RejectRadiologyRequestModalProps {
  order: Order;
  closeModal: () => void;
}

const RejectRadiologyRequestModal: React.FC<RejectRadiologyRequestModalProps> = ({ order, closeModal }) => {
  const { t } = useTranslation();
  const [fulfillerComment, setFulfillerComment] = useState('');
  const abortController = useAbortController();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const invalidateOrders = useInvalidateRadiologyOrders();

  const handleRejectOrder = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    rejectRadiologyOrder(order.uuid, fulfillerComment, abortController).then(
      () => {
        invalidateOrders();
        setIsSubmitting(false);
        closeModal();
        showSnackbar({
          isLowContrast: true,
          title: t('rejectRadiologyRequestTitle', 'Radiology request rejected'),
          kind: 'success',
          subtitle: t(
            'rejectRadiologyRequestSuccessMessage',
            'Radiology request with order number "{{orderNumber}}" rejected successfully',
            { orderNumber: order.orderNumber },
          ),
        });
      },
      (err) => {
        setIsSubmitting(false);
        showNotification({
          title: t('errorRejectingRadiologyRequest', 'Error rejecting radiology request'),
          kind: 'error',
          critical: true,
          description: err?.message,
        });
      },
    );
  };

  return (
    <Form onSubmit={handleRejectOrder}>
      <ModalHeader
        closeModal={closeModal}
        title={`${t('rejectRadiologyRequest', 'Reject radiology request')} [${order.orderNumber}]`}
      />
      <ModalBody>
        <div className={styles.modalBody}>
          <Layer>
            <p className={styles.section}>{`${t('testType', 'Test type')}: ${order.concept?.display}`}</p>
          </Layer>
          <br />
          <Layer>
            <TextArea
              labelText={t('fulfillerComment', 'Fulfiller comment')}
              id="commentField"
              maxCount={500}
              enableCounter
              onChange={(e) => setFulfillerComment(e.target.value)}
            />
          </Layer>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button kind="secondary" onClick={closeModal}>
          {t('cancel', 'Cancel')}
        </Button>
        <Button kind="danger" type="submit" disabled={isSubmitting}>
          {t('reject', 'Reject')}
        </Button>
      </ModalFooter>
    </Form>
  );
};

export default RejectRadiologyRequestModal;
