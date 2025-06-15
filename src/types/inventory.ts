import type { RowDataPacket } from "mysql2";

// --------------------------
interface PublicInventory {
  inventoryName: string;
}
export type InventoryRow = PublicInventory & RowDataPacket;
