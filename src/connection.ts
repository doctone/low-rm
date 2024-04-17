import { Client } from "pg";
import { createClient, type LowRmClient } from "./createClient";
// Function to initialize and connect to the PostgreSQL database

type ConnectionString =
  `postgres://${string}:${string}@${string}:${string}/${string}`;

export async function initializeDatabase(
  connectionString: ConnectionString
): Promise<LowRmClient> {
  // Configure database connection parameters
  const client = new Client({
    connectionString,
  });

  try {
    // Connect to the database
    await client.connect();
    console.log("Connected to the database.");
    const lowRm = createClient("client");
    return lowRm;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error;
  }
}
