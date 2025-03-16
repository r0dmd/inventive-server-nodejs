import getPool from '../../db/getPool.js';

const selectUserByIdModel = async (id) => {
    const pool = await getPool();
    const [users] = await pool.query(
        `SELECT id, username, role FROM users WHERE id = ?`,
        [id],
    );

    return users[0] || null; // Retorna `null` si el usuario no existe
};

export default selectUserByIdModel;
