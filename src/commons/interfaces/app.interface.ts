import { AppEnvironment } from './environment.interface';

export interface AppConfigModel {
  ENV: AppEnvironment;
  ROOT: string;
  IS_PRODUCTION: boolean;
  IS_STAGING: boolean;
  IS_TESTING: boolean;
  TENANT_ID_DEFAULT: number;
}
