import getPool from "../../db/getPool.js";

// ------------------------------------------
const selectInventoryByIdModel = async (inventoryId) => {
  const pool = await getPool();

  const [inventory] = await pool.query(
    "SELECT * FROM inventories WHERE id = ?",
    [inventoryId],
  );

  return inventory;
};

export default selectInventoryByIdModel;
