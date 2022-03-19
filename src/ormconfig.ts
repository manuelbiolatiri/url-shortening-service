import { getOsEnv, getOsEnvArray } from './config/env';
import config from './config/config';

export = {
  url: config.db.url,
  type: config.db.type,
  host: config.db.host,
  database: config.db.database,
  username: config.db.username,
  password: config.db.password,
  entities: getOsEnvArray('TYPEORM_ENTITIES'),
  migrations: getOsEnvArray('TYPEORM_MIGRATIONS'),
  cli: {
    migrationsDir: getOsEnv('TYPEORM_MIGRATIONS_DIR'),
    entitiesDir: getOsEnv('TYPEORM_ENTITIES_DIR'),
  },
  logging: ['query'],
  synchronize: false,
};
