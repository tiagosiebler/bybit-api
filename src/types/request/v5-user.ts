import { PermissionsV5 } from '../v5-shared';

export interface CreateSubApiKeyParamsV5 {
  subuid: number;
  note?: string;
  readOnly: 0 | 1;
  ips?: string[];
  permissions: PermissionsV5;
}

export interface UpdateApiKeyParamsV5 {
  readOnly?: 0 | 1;
  ips?: string[];
  permissions: PermissionsV5;
}

export interface UpdateSubApiKeyUpdateParamsV5 {
  readOnly?: number;
  ips?: string[];
  permissions: PermissionsV5;
}
