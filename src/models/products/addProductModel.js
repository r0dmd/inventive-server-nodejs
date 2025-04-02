import getPool from '../../db/getPool.js';

// ------------------------------------------
const addProductModel = async (userId, productName, description, quantity) => {
    const pool = await getPool();

    const [res] = await pool.query(
        `INSERT INTO products(userId, product, description, quantity) VALUES (?, ?, ?, ?)`,
        [userId, productName, description, quantity],
    );

    return res.insertId;
};

export default addProductModel;
