import { Client } from "pg";

export type LowRmClient = ReturnType<typeof createClient>;

export const createClient = (client: Client) => {
  const select = async ({ query, table }: { query: string; table: string }) => {
    return client.query(`SELECT ${query} FROM ${table}`);
  };

  const insert = async ({
    table,
    values,
  }: {
    table: string;
    values: string[];
  }) => {
    return await client.query(
      `INSERT INTO ${table} VALUES ${values.join(",")}`
    );
  };

  return {
    select,
    insert,
    connect: client.connect,
    query: client.query,
  };
};
