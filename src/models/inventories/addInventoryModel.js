import getPool from "../../db/getPool.js";

// ------------------------------------------
const addInventoryModel = async (userId, inventoryName) => {
  const pool = await getPool();

  const [res] = await pool.query(
    "INSERT INTO inventories(userId, inventory) VALUES (?, ?)",
    [userId, inventoryName],
  );

  return res.insertId;
};

export default addInventoryModel;
