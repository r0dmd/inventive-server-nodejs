import type { ResultSetHeader } from "mysql2";
import getPool from "../../db/getPool";

// ------------------------------------------
const updateInventoryModel = async (
  inventoryId: number,
  inventoryName: string,
): Promise<{ affectedRows: number; updatedInventory: string }> => {
  const pool = await getPool();

  const [result] = await pool.query<ResultSetHeader>(
    "UPDATE inventories SET inventory = ?, modifiedAt = CURRENT_TIMESTAMP WHERE id = ?",
    [inventoryName, inventoryId],
  );

  return {
    affectedRows: result.affectedRows,
    updatedInventory: inventoryName,
  };
};

export default updateInventoryModel;
