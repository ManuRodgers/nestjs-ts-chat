import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
import { IDbConfig } from './interfaces';

const dbConfig: IDbConfig = config.get('db');
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  port: process.env.RDS_PORT || dbConfig.port,
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.password,
  database: process.env.RDS_DB_NAME || dbConfig.database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  // @ts-ignore
  synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
};
