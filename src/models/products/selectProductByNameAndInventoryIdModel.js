import getPool from '../../db/getPool.js';

// ------------------------------------------
const selectProductByNameAndInventoryIdModel = async (
    productName,
    inventoryId,
) => {
    const pool = await getPool();
    const [inventories] = await pool.query(
        `SELECT id FROM products WHERE product = ? AND inventoryId = ?`,
        [productName, inventoryId],
    );

    return inventories[0] || null; // null if there's no product found
};

export default selectProductByNameAndInventoryIdModel;
