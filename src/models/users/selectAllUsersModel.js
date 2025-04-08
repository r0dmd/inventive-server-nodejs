import getPool from '../../db/getPool.js';

// ------------------------------------------
const selectAllUsersModel = async () => {
    const pool = await getPool();

    // We only select users that have not been deleted
    const [users] = await pool.query(
        `SELECT id, username, role FROM users WHERE password <> "Removed user"`,
    );
    return users;
};

export default selectAllUsersModel;
