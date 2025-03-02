import mysql from 'mysql2/promise';
import { generateErrorUtil } from '../utils/index.js';

// Environment variables
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB } = process.env;

// ------------------------------------------
// Variable that will store a group of connections to the DB. It's declared outside the function, so that it's configured only once and then it can be reutilized in each call to getPool, avoiding reinitializations
let pool;

// Function that returns the group of connections
const getPool = async () => {
    try {
        // 1. We establish a temporary connection to verify the connection and create the database if it doesn't exist, without specifying the database name to avoid potential errors
        const connection = await mysql.createConnection({
            host: MYSQL_HOST,
            user: MYSQL_USER,
            password: MYSQL_PASS,
        });

        // 2. We create the database if it doesn't exist and then close the temporary connection
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${MYSQL_DB}\``);
        await connection.end();

        // 3. We configure the pool with the already created database. This ensures all queries point to the correct database, preventing "disconnection" errors
        pool = mysql.createPool({
            host: MYSQL_HOST,
            user: MYSQL_USER,
            password: MYSQL_PASS,
            database: MYSQL_DB,
            timezone: 'Z',
            // Additional configuration for handling high-traffic situations
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });

        // 4. We return the pool directly
        return pool;
    } catch (err) {
        console.error(err);
        generateErrorUtil(
            'The connection to the database could not be established',
            503,
        );
    }
};

export default getPool;
