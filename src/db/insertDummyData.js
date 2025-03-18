import 'dotenv/config';
import getPool from './getPool.js';

import bcrypt from 'bcrypt';
const SALT_ROUNDS = 10; // Number of salt rounds for the hash

// ------------------------------------------
const insertDummyData = async () => {
    try {
        const pool = await getPool();

        // Encrypted passwords
        const passwordAdmin = await bcrypt.hash('userAdmin', SALT_ROUNDS);
        const passwordUser = await bcrypt.hash('userNormal', SALT_ROUNDS);

        console.log('Inserting dummy users...');
        const [user1] = await pool.query(
            `INSERT INTO users (username, password, role) VALUES (?, ?, ?)`,
            ['userAdmin', passwordAdmin, 'admin'],
        );
        const [user2] = await pool.query(
            `INSERT INTO users (username, password, role) VALUES (?, ?, ?)`,
            ['userNormal', passwordUser, 'normal'],
        );

        console.log('Inserting dummy inventories...');
        const [inventory1] = await pool.query(
            `INSERT INTO inventories (userId, inventory) VALUES (?, ?)`,
            [user1.insertId, 'Admin Inventory'],
        );
        const [inventory2] = await pool.query(
            `INSERT INTO inventories (userId, inventory) VALUES (?, ?)`,
            [user2.insertId, 'User Inventory'],
        );

        console.log('Inserting dummy products...');
        await pool.query(
            `INSERT INTO products (inventoryId, product, description, quantity) VALUES (?, ?, ?, ?)`,
            [inventory1.insertId, 'Laptop', 'High-end laptop', 5],
        );
        await pool.query(
            `INSERT INTO products (inventoryId, product, description, quantity) VALUES (?, ?, ?, ?)`,
            [inventory1.insertId, 'Keyboard', 'Mechanical keyboard', 10],
        );
        await pool.query(
            `INSERT INTO products (inventoryId, product, description, quantity) VALUES (?, ?, ?, ?)`,
            [inventory2.insertId, 'Mouse', 'Wireless mouse', 15],
        );
        await pool.query(
            `INSERT INTO products (inventoryId, product, description, quantity) VALUES (?, ?, ?, ?)`,
            [inventory2.insertId, 'RAM', 'Memory', 7],
        );

        console.log('Dummy data inserted successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Error inserting dummy data:', err);
        process.exit(1);
    }
};

insertDummyData();
