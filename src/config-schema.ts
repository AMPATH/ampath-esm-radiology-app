import { Type } from '@openmrs/esm-framework';

export const configSchema = {
  procedureOrderTypeUuid: {
    _type: Type.UUID,
    _default: "2315ab24-9a4e-4b36-b189-8e74d2c77394",
    _description: ""
  }
};

export type Config = {
  procedureOrderTypeUuid: string;
};
