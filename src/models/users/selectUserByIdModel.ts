import getPool from "../../db/getPool";
import type { PublicUser, UserRows } from "../../types/user";

// ---------------------
const selectUserByIdModel = async (id: number): Promise<PublicUser | null> => {
  const pool = await getPool();
  const [users] = await pool.query<UserRows>(
    "SELECT id, username, role FROM users WHERE id = ?",
    [id],
  );

  return users[0] ?? null;
};

export default selectUserByIdModel;
