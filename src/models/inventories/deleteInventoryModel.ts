import type { ResultSetHeader } from "mysql2";
import getPool from "../../db/getPool";

// ------------------------------------------
const deleteInventoryModel = async (inventoryId: number): Promise<number> => {
  const pool = await getPool();

  const [res] = await pool.query<ResultSetHeader>(
    `
        DELETE FROM inventories WHERE id = ?`,
    [inventoryId],
  );

  return res.affectedRows;
};

export default deleteInventoryModel;
