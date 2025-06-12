import bcrypt from "bcrypt";
import getPool from "../../db/getPool.js";
import { generateErrorUtil } from "../../utils/index.js";

// ------------------------------------------
const updatePassModel = async (userId, oldPass, newPass) => {
  const pool = await getPool();

  const [pass] = await pool.query(
    `
        SELECT password FROM users WHERE id = ?`,
    [userId],
  );

  // Checks
  if (
    pass.length === 0 ||
    (await bcrypt.compare(oldPass, pass[0].password)) === false
  ) {
    generateErrorUtil("Invalid credentials", 401);
  }

  const hashedNewPass = await bcrypt.hash(newPass, 10);

  const [res] = await pool.query(
    `
        UPDATE users SET password = ? WHERE id = ?`,
    [hashedNewPass, userId],
  );

  // If the affected rows are 0, that means the user was not found
  if (res.affectedRows === 0) {
    generateErrorUtil("User not found", 400);
  }
  return res.affectedRows;
};

export default updatePassModel;
