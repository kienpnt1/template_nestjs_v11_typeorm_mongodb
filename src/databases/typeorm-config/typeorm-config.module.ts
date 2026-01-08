import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';
import { APP_CONFIG } from '../../configs/app.config';
async function ormConfig(): Promise<TypeOrmModuleOptions> {
  const commonConf = {
    SYNCRONIZE: false,
    ENTITIES: [path.join(__dirname, '..') + '/entities/*.entity{.ts,.js}'],
  };

  const ormconfig: TypeOrmModuleOptions = {
    name: 'default',
    type: 'mongodb',
    host: APP_CONFIG.ENV.DATABASE.MONGODB.HOST,
    port: APP_CONFIG.ENV.DATABASE.MONGODB.PORT,
    database: APP_CONFIG.ENV.DATABASE.MONGODB.NAME,
    username: APP_CONFIG.ENV.DATABASE.MONGODB.USERNAME,
    password: APP_CONFIG.ENV.DATABASE.MONGODB.PASSWORD,
    logging: false,
    synchronize: commonConf.SYNCRONIZE,
    entities: commonConf.ENTITIES,
  };
  return ormconfig;
}

export { ormConfig };
