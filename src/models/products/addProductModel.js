import getPool from "../../db/getPool.js";

// ------------------------------------------
const addProductModel = async (
  inventoryId,
  productName,
  description,
  quantity,
) => {
  const pool = await getPool();

  const [res] = await pool.query(
    "INSERT INTO products(inventoryId, product, description, quantity) VALUES (?, ?, ?, ?)",
    [inventoryId, productName, description, quantity],
  );

  return res.insertId;
};

export default addProductModel;
