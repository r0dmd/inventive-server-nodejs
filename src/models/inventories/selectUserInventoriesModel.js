import getPool from '../../db/getPool.js';

// ------------------------------------------
const selectUserInventoriesModel = async (userId) => {
    const pool = await getPool();

    const [inventories] = await pool.query(
        `
        SELECT * FROM inventories WHERE userId = ?`,
        [userId],
    );

    return inventories;
};

export default selectUserInventoriesModel;
