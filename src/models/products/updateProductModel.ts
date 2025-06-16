import getPool from "../../db/getPool";
import type { ResultSetHeader } from "mysql2";
import type { ProductUpdatePayload } from "../../types/product";

// ------------------------------------------
const updateProductModel = async (
  productId: number,
  fieldsToUpdate: ProductUpdatePayload,
): Promise<number> => {
  const pool = await getPool();
  const fields: string[] = [];
  const values: (string | number)[] = [];

  for (const [key, value] of Object.entries(fieldsToUpdate) as [
    keyof ProductUpdatePayload,
    string | number | undefined,
  ][]) {
    if (value !== undefined) {
      fields.push(`${key} = ?`);
      values.push(value);
    }
  }

  // Always update `modifiedAt`
  fields.push("modifiedAt = CURRENT_TIMESTAMP");
  values.push(productId);

  const [res] = await pool.query<ResultSetHeader>(
    `
      UPDATE products
      SET ${fields.join(", ")}
      WHERE id = ?
    `,
    values,
  );

  return res.affectedRows;
};

export default updateProductModel;
