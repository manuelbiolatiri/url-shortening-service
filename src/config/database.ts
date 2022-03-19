import {
  Connection,
  ConnectionOptions,
  createConnection,
  getConnectionManager,
} from 'typeorm';
import dotenv from 'dotenv';
import { config } from './config';

// Init environment
dotenv.config();

const options: ConnectionOptions = {
  type: 'postgres',
  name: 'default',
  host: process.env.TYPEORM_HOST || 'localhost',
  port: Number(process.env.TYPEORM_PORT) || 5432,
  username: process.env.TYPEORM_USERNAME || 'postgres',
  password: process.env.TYPEORM_PASSWORD || 'root',
  database: process.env.TYPEORM_DATABASE || 'urlshortener',
  migrations: config.app.dirs.migrations,
  entities: config.app.dirs.entities,
  cli: {
    migrationsDir: config.app.dirs.migrationsDir,
    entitiesDir: config.app.dirs.entitiesDir,
  },
  logging: false,
  synchronize: false,
};

export const createDatabaseConnection = async (): Promise<Connection> => {
  const connection = await createConnection(
    Object.assign(options, {
      type: 'postgres',
      migrations: config.app.dirs.migrations,
      entities: config.app.dirs.entities,
      synchronize: false,
      logging: false,
      cli: {
        migrationsDir: config.app.dirs.migrationsDir,
        entitiesDir: config.app.dirs.entitiesDir,
      },
    }),
  );

  console.info(`Connected to ${connection.options.type} database`);

  return connection;
};

export const migrateDatabase = async (connection: Connection) => {
  console.info(
    `Processing ${connection.migrations.length} database migrations`,
  );

  const migrations = await connection.runMigrations();

  console.info(`Executed ${migrations.length} database migrations`);

  return migrations;
};

export const initialize = async () => {
  const connection = await createDatabaseConnection();

  await migrateDatabase(connection);

  return connection;
};

export const getDefaultConnection = async () => {
  const connections = getConnectionManager().connections;

  if (connections.length) {
    return connections[0];
  }

  return await initialize();
};

export default { initialize, getDefaultConnection };
