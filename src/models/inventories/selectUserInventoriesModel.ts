import getPool from "../../db/getPool";
import type { InventoryRow } from "../../types/inventory";

// ------------------------------------------
const selectUserInventoriesModel = async (
  userId: number,
): Promise<InventoryRow[]> => {
  const pool = await getPool();

  const [inventories] = await pool.query<InventoryRow[]>(
    `
        SELECT * FROM inventories WHERE userId = ?`,
    [userId],
  );

  return inventories;
};

export default selectUserInventoriesModel;
