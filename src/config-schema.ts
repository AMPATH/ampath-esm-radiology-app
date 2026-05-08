import { Type } from '@openmrs/esm-framework';

export const configSchema = {
  radiologyOrderTypeUuid: {
    _type: Type.UUID,
    _default: "ff4485a4-f071-4423-aeb2-db6efce52b83",
    _description: ""
  },
  radiologyServiceTypedUuid: {
    _type: Type.UUID,
    _default: '3jdeq9de-9145-4272-add4-a251005f781e',
    _description: 'Radiology billable service type',
  },
  radiologyReportFreetextUuid: {
    _type: Type.UUID,
    _default: '312810e7-03b4-481d-bbdd-24919478dbb5',
    _description: 'A freetext question to capture Radiology report'
  },
  enableOdooBilling: {
    _type: Type.Boolean,
    _default: false,
    _description: 'Enable Odoo billing'
  },
  blockedPaymentModes: {
    _type: Type.Array,
    _default: ['MPESA', 'CASH'],
    _description: 'Payment modes that require bill generation before picking an order',
  },
  serviceUuid: {
    _type: Type.UUID,
    _default: '2d4472e2-d7ab-4430-8e0e-a9ffcd809bf4',
    _description: 'Service Uuid for filtering queues',
  },
};

export type Config = {
  radiologyOrderTypeUuid: string;
  radiologyServiceTypedUuid: string;
  radiologyReportFreetextUuid: string;
  enableOdooBilling: boolean;
  blockedPaymentModes: Array<string>;
  serviceUuid: string;
};

export const StringPath =
  "M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4 14.6 16 8 22.6 9.4 24 16 17.4 22.6 24 24 22.6 17.4 16 24 9.4z";
