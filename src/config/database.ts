import { Connection, createConnection, getConnectionManager } from 'typeorm';
import dotenv from 'dotenv';
import { config } from './config';

// Init environment
dotenv.config();

const options: any = {};

if (config.db.url) {
  options.url = config.db.url;
} else {
  options.host = config.db.host;
  options.type = config.db.type;
  options.port = config.db.port;
  options.database = config.db.database;
  options.username = config.db.username;
  options.password = config.db.password;
}

if (config.db.ssl) {
  options.ssl = config.db.ssl;
  options.extra = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

export const createDatabaseConnection = async (): Promise<Connection> => {
  const connection = await createConnection(
    Object.assign(options, {
      type: 'postgres',
      migrations: ['src/migrations/**/*.ts'],
      entities: ['src/models/**/*.ts'],
      synchronize: false,
      logging: false,
      cli: {
        migrationsDir: 'src/migrations',
        entitiesDir: 'src/models',
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

export const closeDatabase = (connection: Connection) => {
  return connection.close();
};

export default { initialize, getDefaultConnection, closeDatabase };
