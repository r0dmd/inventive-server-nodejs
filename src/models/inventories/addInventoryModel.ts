import type { ResultSetHeader } from "mysql2";
import getPool from "../../db/getPool";

// ------------------------------------------
const addInventoryModel = async (
  userId: number,
  inventoryName: string,
): Promise<number> => {
  const pool = await getPool();

  const [res] = await pool.query<ResultSetHeader>(
    "INSERT INTO inventories(userId, inventory) VALUES (?, ?)",
    [userId, inventoryName],
  );

  return res.insertId;
};

export default addInventoryModel;
