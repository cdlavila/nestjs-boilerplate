import { Client } from 'pg';

export const connectToDB = async (dbConfig) => {
  const client = new Client(dbConfig);
  try {
    await client.connect();
    return client;
  } catch (error) {
    throw new Error(`Error in connection to PostgreSQL: ${error}`);
  }
};
