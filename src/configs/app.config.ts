import * as path from 'path';

import EnvConfig from './env.config';
import { AppConfigModel } from '@commons/interfaces';

const ROOT = path.normalize(__dirname + '/..');

export const APP_CONFIG = {
  ROOT: ROOT,
  ENV: EnvConfig,
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_STAGING: process.env.NODE_ENV === 'staging',
  IS_DEVELOP: process.env.NODE_ENV === 'develop',
  IS_TESTING: process.env.NODE_ENV === 'test',
  TENANT_ID_DEFAULT: 1,
} as AppConfigModel;
