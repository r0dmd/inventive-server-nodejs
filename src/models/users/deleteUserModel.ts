import type { ResultSetHeader } from "mysql2";
import getPool from "../../db/getPool";

// ------------------------------------------
const deleteUserModel = async (userId: number) => {
  const pool = await getPool();

  const deletedUsername = crypto.randomUUID().replace(/-/g, "").slice(0, 24);

  // Actualizamos la base de datos.
  const [res] = await pool.query<ResultSetHeader>(
    `UPDATE users SET modifiedAt = NOW(), lastAuthUpdate = NOW(),
         password = "Removed user",
         username = ?
         WHERE id = ?`,
    [deletedUsername, userId],
  );

  return res.affectedRows;
};

export default deleteUserModel;
