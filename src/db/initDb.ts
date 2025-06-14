import "dotenv/config";
import getPool from "./getPool";

// ------------------------------------------
// NOTE: Although this function ends with process.exit(), TS still infers it as Promise<void>, because it's async and not all paths are statically unreachable. So we explicitly annotate it as such.

const main = async (): Promise<void> => {
  try {
    const pool = await getPool();

    console.log(
      "Deleting tables in reverse order to avoid foreign key constraints...",
    );
    await pool.query("DROP TABLE IF EXISTS products, inventories, users");

    console.log("Generating tables...");
    // USERS
    await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                username VARCHAR(25) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                role ENUM('admin', 'normal') DEFAULT 'normal',
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
                lastAuthUpdate DATETIME
            )
        `);
    // INVENTORIES
    await pool.query(`
            CREATE TABLE IF NOT EXISTS inventories (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                userId INT UNSIGNED NOT NULL,
                FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
                inventory VARCHAR(80) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
            )
        `);
    // PRODUCTS
    // quantity is unsigned to avoid negative product stock and defaults to 0
    await pool.query(`
            CREATE TABLE IF NOT EXISTS products (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                inventoryId INT UNSIGNED NOT NULL,
                FOREIGN KEY (inventoryId) REFERENCES inventories(id) ON DELETE CASCADE,
                product VARCHAR(50) UNIQUE NOT NULL,
                description VARCHAR(100),
                quantity SMALLINT UNSIGNED DEFAULT 0,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
            )
        `);

    console.log("Tables generated successfully!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Function call
main();
