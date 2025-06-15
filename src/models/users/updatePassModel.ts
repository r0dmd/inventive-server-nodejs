import bcrypt from "bcrypt";
import getPool from "../../db/getPool";
import { generateErrorUtil } from "../../utils/index";

import type { HashedPassRow } from "../../types/user";
import type { ResultSetHeader } from "mysql2";

// ------------------------------------------
const updatePassModel = async (
  userId: number,
  oldPass: string,
  newPass: string,
): Promise<number> => {
  const pool = await getPool();

  const [pass] = await pool.query<HashedPassRow[]>(
    "SELECT password FROM users WHERE id = ?",
    [userId],
  );

  if (
    pass.length === 0 ||
    (await bcrypt.compare(oldPass, pass[0].password)) === false
  ) {
    throw generateErrorUtil("Invalid credentials", 401);
  }

  const hashedNewPass = await bcrypt.hash(newPass, 10);

  const [res] = await pool.query<ResultSetHeader>(
    "UPDATE users SET password = ? WHERE id = ?",
    [hashedNewPass, userId],
  );

  if (res.affectedRows === 0) {
    throw generateErrorUtil("User not found", 400);
  }
  return res.affectedRows;
};

export default updatePassModel;
