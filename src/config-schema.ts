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

export const StringPath =
  "M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4 14.6 16 8 22.6 9.4 24 16 17.4 22.6 24 24 22.6 17.4 16 24 9.4z";
