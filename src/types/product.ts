import type { RowDataPacket } from "mysql2";

// Another way of doing it, extending directly from RowDataPacket instead of doing "& RowDataPacket"
export interface ProductRow extends RowDataPacket {
  productId: number;
  product: string;
  description: string;
  quantity: number;
  createdAt: Date;
  modifiedAt: Date;
  inventory: string;
}

export type ProductRows = ProductRow[];
