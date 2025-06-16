import getPool from "../../db/getPool";
import type { InventoryRow } from "../../types/inventory";

// ------------------------------------------
const selectProductByNameAndInventoryIdModel = async (
  productName: string,
  inventoryId: number,
): Promise<InventoryRow | null> => {
  const pool = await getPool();
  const [inventories] = await pool.query<InventoryRow[]>(
    "SELECT id FROM products WHERE product = ? AND inventoryId = ?",
    [productName, inventoryId],
  );

  return inventories[0] ?? null;
};

export default selectProductByNameAndInventoryIdModel;
