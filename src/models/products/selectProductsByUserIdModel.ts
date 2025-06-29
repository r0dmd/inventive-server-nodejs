import getPool from "../../db/getPool";
import type { ProductRow } from "../../types/product";

// ----------------------------
const selectProductsByUserIdModel = async (
  userId: number,
): Promise<ProductRow[]> => {
  const pool = await getPool();

  const [products] = await pool.query<ProductRow[]>(
    `
      SELECT 
        p.id AS productId,
        p.product,
        p.description,
        p.quantity,
        p.createdAt,
        p.modifiedAt,
        i.inventory
        FROM products p
        INNER JOIN inventories i ON p.inventoryId = i.id
        WHERE i.userId = ?
        `,

    [userId],
  );
  return products;
};

export default selectProductsByUserIdModel;
