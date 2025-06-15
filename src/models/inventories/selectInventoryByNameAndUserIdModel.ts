import getPool from "../../db/getPool";
import type { InventoryRow } from "../../types/inventory";

// ------------------------------------------
const selectInventoryByNameAndUserIdModel = async (
  inventoryName: string,
  userId: number,
): Promise<InventoryRow> => {
  const pool = await getPool();
  const [inventories] = await pool.query<InventoryRow[]>(
    "SELECT id FROM inventories WHERE inventory = ? AND userId = ?",
    [inventoryName, userId],
  );

  return inventories[0] || null;
};

export default selectInventoryByNameAndUserIdModel;
