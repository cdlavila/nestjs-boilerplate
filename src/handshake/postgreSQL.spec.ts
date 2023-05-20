import { connectToDB } from './postgreSQL';
import databaseConfig from '../config/database.config';

import * as dotenv from 'dotenv';

dotenv?.config({ path: '.env' });

describe('connectToDB', () => {
  const database = databaseConfig()['database'][process.env.NODE_ENV];
  const dbConfig = {
    host: database?.host,
    port: database?.port,
    user: database?.user,
    password: database?.password,
    database: database?.name,
  };
  test('should establish connection to PostgreSQL successfully', async () => {
    const client = await connectToDB(dbConfig);
    expect(client).toBeDefined();
    client.end();
  });
});
