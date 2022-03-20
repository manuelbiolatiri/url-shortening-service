import * as dotenv from 'dotenv';
import * as path from 'path';

import {
  getOsEnv,
  getOsEnvOptional,
  normalizePort,
  toBool,
  toNumber,
} from './env';

/**
 * Load .env file or for tests the .env.test file.
 */
dotenv.config({
  path: path.join(
    process.cwd(),
    `.env${process.env.NODE_ENV === 'test' ? '.test' : ''}`,
  ),
});

/**
 * Environment variables
 */
export const config = {
  node: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
  isDevelopment: process.env.NODE_ENV === 'development',
  app: {
    host: getOsEnv('APP_HOST'),
    scheme: getOsEnv('APP_SCHEME'),
    routePrefix: getOsEnv('APP_ROUTE_PREFIX'),
    port: normalizePort(process.env.PORT || getOsEnv('APP_PORT')),
  },
  db: {
    url: getOsEnvOptional('TYPEORM_URL'),
    type: getOsEnvOptional('TYPEORM_CONNECTION_TYPE'),
    host: getOsEnvOptional('TYPEORM_HOST'),
    ssl: toBool(getOsEnvOptional('TYPEORM_SSL')),
    port: toNumber(getOsEnvOptional('TYPEORM_PORT')),
    username: getOsEnvOptional('TYPEORM_USERNAME'),
    password: getOsEnvOptional('TYPEORM_PASSWORD'),
    database: getOsEnvOptional('TYPEORM_DATABASE'),
  },
};

export default config;
