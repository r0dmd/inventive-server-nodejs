import getPool from "../../db/getPool.js";

// ------------------------------------------
const deleteProductModel = async (productId) => {
  const pool = await getPool();

  const [res] = await pool.query(
    `
        DELETE FROM products WHERE id = ?`,
    [productId],
  );

  return res.affectedRows;
};

export default deleteProductModel;
