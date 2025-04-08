import getPool from '../../db/getPool.js';

const updateUserModel = async (userId, newUsername) => {
    const pool = await getPool();

    console.log(userId);
    console.log(newUsername);

    const [res] = await pool.query(
        `
    UPDATE users SET username = ?, modifiedAt = CURRENT_TIMESTAMP WHERE id = ?`,
        [newUsername, userId],
    );

    return res.affectedRows;
};

export default updateUserModel;
