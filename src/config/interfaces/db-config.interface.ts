export interface IDbConfig {
  type?: DbEnum;
  host?: string;
  username?: string;
  password?: string;
  database?: string;
  port?: number;
  synchronize?: boolean | string;
}

export enum DbEnum {
  postgres = 'postgres',
  cockroachdb = 'cockroachdb',
  cordova = 'cordova',
  expo = 'expo',
  mariadb = 'mariadb',
  mongodb = 'mongodb',
  mssql = 'mssql',
  mysql = 'mysql',
  nativescript = 'nativescript',
  oracle = 'oracle',
  reactNative = 'react-native',
  sqlite = 'sqlite',
  sqljs = 'sqljs',
}
