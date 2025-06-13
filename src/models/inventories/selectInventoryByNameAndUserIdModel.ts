import getPool from "../../db/getPool.js";

// ------------------------------------------
const selectInventoryByNameAndUserIdModel = async (inventoryName, userId) => {
  const pool = await getPool();
  const [inventories] = await pool.query(
    "SELECT id FROM inventories WHERE inventory = ? AND userId = ?",
    [inventoryName, userId],
  );

  return inventories[0] || null; // null if there's no inventory found
};

export default selectInventoryByNameAndUserIdModel;
