import "dotenv/config";
import getPool from "./getPool.js";
import type { ResultSetHeader } from "mysql2";

import bcrypt from "bcrypt";
const SALT_ROUNDS = 10;

// Strongly typed insert helper (values must be a readonly array of acceptable SQL values)
const insert = async (
  sql: string,
  values: readonly (string | number | boolean | null)[],
): Promise<number> => {
  const pool = await getPool();
  const [result] = await pool.query<ResultSetHeader>(sql, values);
  return result.insertId;
};

// -----------------------------
const insertDummyData = async (): Promise<void> => {
  try {
    const passwordAdmin = await bcrypt.hash("userAdmin", SALT_ROUNDS);
    const passwordUser = await bcrypt.hash("userNormal", SALT_ROUNDS);

    console.log("Inserting dummy users...");
    const user1Id = await insert(
      "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
      ["userAdmin", passwordAdmin, "admin"],
    );
    const user2Id = await insert(
      "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
      ["userNormal", passwordUser, "normal"],
    );

    console.log("Inserting dummy inventories...");
    const inventory1Id = await insert(
      "INSERT INTO inventories (userId, inventory) VALUES (?, ?)",
      [user1Id, "Admin Inventory"],
    );
    const inventory2Id = await insert(
      "INSERT INTO inventories (userId, inventory) VALUES (?, ?)",
      [user2Id, "User Inventory"],
    );

    console.log("Inserting dummy products...");
    await insert(
      "INSERT INTO products (inventoryId, product, description, quantity) VALUES (?, ?, ?, ?)",
      [inventory1Id, "Laptop", "High-end laptop", 5],
    );
    await insert(
      "INSERT INTO products (inventoryId, product, description, quantity) VALUES (?, ?, ?, ?)",
      [inventory1Id, "Keyboard", "Mechanical keyboard", 10],
    );
    await insert(
      "INSERT INTO products (inventoryId, product, description, quantity) VALUES (?, ?, ?, ?)",
      [inventory2Id, "Mouse", "Wireless mouse", 15],
    );
    await insert(
      "INSERT INTO products (inventoryId, product, description, quantity) VALUES (?, ?, ?, ?)",
      [inventory2Id, "RAM", "Memory", 7],
    );

    console.log("Dummy data inserted successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error inserting dummy data:", err);
    process.exit(1);
  }
};

insertDummyData();
