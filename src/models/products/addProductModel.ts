import type { ResultSetHeader } from "mysql2";
import getPool from "../../db/getPool";

// ------------------------------------------
const addProductModel = async (
  inventoryId: number,
  productName: string,
  description: string,
  quantity: string,
): Promise<number> => {
  const pool = await getPool();

  const [res] = await pool.query<ResultSetHeader>(
    "INSERT INTO products(inventoryId, product, description, quantity) VALUES (?, ?, ?, ?)",
    [inventoryId, productName, description, quantity],
  );

  return res.insertId;
};

export default addProductModel;
