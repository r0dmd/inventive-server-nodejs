import getPool from '../../db/getPool.js';

const deleteUserByIdModel = async (id) => {
    const pool = await getPool();

    // Delete the user with the given ID
    const [result] = await pool.query(`DELETE FROM users WHERE id = ?`, [id]);

    // Check if any row was affected (if the user existed)
    return result.affectedRows > 0;
};

export default deleteUserByIdModel;
