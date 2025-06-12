import getPool from "../../db/getPool.js";

// ------------------------------------------
const deleteInventoryModel = async (inventoryId) => {
  const pool = await getPool();

  const [res] = await pool.query(
    `
        DELETE FROM inventories WHERE id = ?`,
    [inventoryId],
  );

  return res.affectedRows;
};

export default deleteInventoryModel;
