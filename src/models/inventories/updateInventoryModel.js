import getPool from '../../db/getPool.js';

// ------------------------------------------
const updateInventoryModel = async (inventoryId, inventoryName) => {
    const pool = await getPool();

    const [result] = await pool.query(
        `UPDATE inventories SET inventory = ?, modifiedAt = CURRENT_TIMESTAMP WHERE id = ?`,
        [inventoryName, inventoryId]
    );

    return {
        affectedRows: result.affectedRows,
        updatedInventory: inventoryName,  // Cambié 'inventory' por 'inventoryName'
    };
};

export default updateInventoryModel;
