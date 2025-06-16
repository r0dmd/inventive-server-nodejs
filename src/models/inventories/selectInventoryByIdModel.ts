import getPool from "../../db/getPool";
import type { InventoryRow } from "../../types/inventory";

// ------------------------------------------
const selectInventoryByIdModel = async (
  inventoryId: number,
): Promise<InventoryRow[]> => {
  const pool = await getPool();

  const [inventory] = await pool.query<InventoryRow[]>(
    "SELECT * FROM inventories WHERE id = ?",
    [inventoryId],
  );

  return inventory;
};

export default selectInventoryByIdModel;
