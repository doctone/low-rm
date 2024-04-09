import { Client } from "pg";

export type LowRmClient = ReturnType<typeof createClient>;

export const createClient = (client: Client) => {
  const select = async ({ query, table }: { query: string; table: string }) => {
    return await client.query(`SELECT ${query} FROM ${table}`);
  };

  return {
    select,
    connect: client.connect,
    query: client.query,
  };
};
