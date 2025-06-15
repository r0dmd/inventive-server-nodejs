import getPool from "../../db/getPool";
import type { UserRows } from "../../types/user";

// ------------------------------------------
const selectAllUsersModel = async (): Promise<UserRows> => {
  const pool = await getPool();

  // We only select users that have not been deleted
  const [users] = await pool.query<UserRows>(
    `SELECT id, username, role, createdAt, modifiedAt FROM users WHERE password <> "Removed user"`,
  );
  return users;
};

export default selectAllUsersModel;
