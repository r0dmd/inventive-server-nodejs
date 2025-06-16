import type { ResultSetHeader } from "mysql2";
import getPool from "../../db/getPool";

// ------------------------------------------
const deleteProductModel = async (productId: number): Promise<number> => {
  const pool = await getPool();

  const [res] = await pool.query<ResultSetHeader>(
    `
        DELETE FROM products WHERE id = ?`,
    [productId],
  );

  return res.affectedRows;
};

export default deleteProductModel;
