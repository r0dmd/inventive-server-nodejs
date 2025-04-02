import getPool from '../../db/getPool.js';

// ------------------------------------------
const selectProductByNameAndUserIdModel = async (productName, userId) => {
    const pool = await getPool();
    const [inventories] = await pool.query(
        `SELECT id FROM products WHERE product = ? AND userId = ?`,
        [productName, userId],
    );

    return inventories[0] || null; // null if there's no product found
};

export default selectProductByNameAndUserIdModel;
