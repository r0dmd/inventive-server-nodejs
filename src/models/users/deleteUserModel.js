import getPool from '../../db/getPool.js';

// ------------------------------------------
const deleteUserModel = async (userId) => {
    const pool = await getPool();

    const deletedUsername = crypto.randomUUID().replace(/-/g, '').slice(0, 24);

    // Actualizamos la base de datos.
    const [res] = await pool.query(
        `UPDATE users SET modifiedAt = NOW(), lastAuthUpdate = NOW(),
         password = "Removed user",
         username = ?
         WHERE id = ?`,
        [deletedUsername, userId],
    );

    return res.affectedRows;
};

export default deleteUserModel;
