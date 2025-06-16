import getPool from "../../db/getPool";
import type { ProductRow } from "../../types/product";

// ------------------------------------------
const selectProductByIdModel = async (
  productId: number,
): Promise<ProductRow[]> => {
  const pool = await getPool();

  const [product] = await pool.query<ProductRow[]>(
    "SELECT * FROM products WHERE id = ?",
    [productId],
  );

  return product;
};

export default selectProductByIdModel;
