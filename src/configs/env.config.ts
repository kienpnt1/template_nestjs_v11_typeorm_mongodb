import * as path from 'path';
import * as dotenv from 'dotenv';
import { AppEnvironment } from '@commons/interfaces';

const ROOT = path.normalize(__dirname + '/../..');
const PATH = process.env.NODE_ENV === 'test' ? `${ROOT}/.env_test` : `${ROOT}/.env`;
dotenv.config({ path: PATH });

const envConfig: AppEnvironment = {
  NODE_ENV: process.env.NODE_ENV || 'develop',
  VERSION: process.env.VERSION || 'v1',
  APP: {
    PORT: Number(process.env.APP_PORT || '9999'),
    NAME: process.env.APP_NAME || 'cxm-service',
  },
  DATABASE: {
    MONGODB: {
      URI: process.env.MONGODB_URI || 'mongodb://10.254.60.192:27017',
      HOST: process.env.MONGODB_HOST || '10.254.60.192',
      PORT: Number(process.env.MONGODB_PORT) || 27017,
      NAME: process.env.MONGODB_NAME || 'cxm',
      USERNAME: process.env.MONGODB_USERNAME || 'cxm',
      PASSWORD: process.env.MONGODB_PASSWORD || 'f83e69e4170a786e44e3d32a2479cce9',
    },
    REDIS: {
      HOST: process.env.DATABASE_REDIS_HOST || '10.254.60.192',
      PORT: process.env.DATABASE_REDIS_PORT ? Number(process.env.DATABASE_REDIS_PORT) : 6380,
      DB: process.env.DATABASE_REDIS_DB ? Number(process.env.DATABASE_REDIS_DB) : 15,
      PASS: process.env.DATABASE_REDIS_PASS || 'redisf83e69e4170a786e44e3d32a2479cce9',
    },
  },
  KAFKA_CONFIG: {
    SHOW_LOG: process.env.KAFKA_CONFIG_SHOW_LOG && process.env.KAFKA_CONFIG_SHOW_LOG === 'true' ? true : false,
    BROKERS: [process.env.BOOKERS_KAFKA_CONFIG || '127.0.0.1:19092'],
    GROUP_ID: process.env.GROUPID_KAFKA_CONFIG || 'template-group',
    CLIENT_ID: process.env.CLIENTID_KAFKA_CONFIG || 'template-client-id',
  },
  SECURE: {
    SECRET_KEY: process.env.SECURE_SECRET_KEY || 'hWmZq4t7w!z%C*F-JaNdRgUkXn2r5u8x',
    SECRET_KEY_CLIENT_IDS:
      process.env.SECURE_SECRET_CLIENT_IDS ||
      'OLD:f54cbce96307efc,8867641177acc7cf8,33676411a77cc7cf8|CHAT_BOT:41177acc7cf87acc7,7cf87acc741177acc',
    JWT: {
      JWT_SECRET: process.env.JWT_SECRET || '3d0a6b32ed788db9f5598c1188b8f6d0',
      EXPIRE: Number(process.env.JWT_EXPIRE || '1000000'),
    },
  },
  LOGS: {
    IS_HAS_LOG: process.env.LOGS_IS_HAS && process.env.LOGS_IS_HAS === 'true',
    PATH: process.env.LOGS_PATH || './_data/logs/',
  },
};
export default envConfig;
