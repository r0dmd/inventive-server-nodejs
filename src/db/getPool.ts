import mysql from "mysql2/promise";
import type { Pool, PoolOptions } from "mysql2/promise";
import { generateErrorUtil } from "../utils/index";

// Environment variables
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB } = process.env;

if (!MYSQL_HOST || !MYSQL_USER || !MYSQL_PASS || !MYSQL_DB) {
  generateErrorUtil("Missing required MySQL environment variables.");
}

// ------------------------------------------
// Variable that will store a group of connections to the DB. It's declared outside the function, so that it's configured only once and then it can be reutilized in each call to getPool, avoiding reinitializations
let pool: Pool;

// Function that returns the group of connections
const getPool = async (): Promise<Pool> => {
  try {
    // Return cached pool if it exists
    if (pool) return pool;

    // 1. Temp connection to verify it works and create the database if it doesn't exist, without specifying the database name to avoid potential errors
    const connection = await mysql.createConnection({
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASS,
    });

    // 2. Create DB if missing and then close the temp connection
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${MYSQL_DB}\``);
    await connection.end();

    // 3. Configure pool with DB. This ensures all queries point to the correct DB, preventing "disconnection" errors
    const config: PoolOptions = {
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASS,
      database: MYSQL_DB,
      timezone: "Z",
      // Additional configuration for handling high-traffic situations
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    };

    pool = mysql.createPool(config);

    // 4. Return pool directly
    return pool;
  } catch (err) {
    console.error(err);
    // NOTE: Explicitly return the `never`-returning function to satisfy TS's control flow analysis
    return generateErrorUtil(
      "The connection to the database could not be established.",
      503,
    );
  }
};

export default getPool;
