import type { ResultSetHeader } from "mysql2";
import getPool from "../../db/getPool";

const updateUserModel = async (
  userId: number,
  newUsername: string,
): Promise<number> => {
  const pool = await getPool();

  const [res] = await pool.query<ResultSetHeader>(
    `
    UPDATE users SET username = ?, modifiedAt = CURRENT_TIMESTAMP WHERE id = ?`,
    [newUsername, userId],
  );

  return res.affectedRows;
};

export default updateUserModel;
