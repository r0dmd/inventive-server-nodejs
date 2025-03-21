import getPool from '../../db/getPool.js';

const updateUserModel = async (userId, updatedData) => {
    const pool = await getPool();

    const queryParts = [];
    const queryParams = [];

    if (updatedData.username) {
        queryParts.push('username = ?');
        queryParams.push(updatedData.username);
    }
    if (updatedData.password) {
        queryParts.push('password = ?');
        queryParams.push(updatedData.password);
    }

    if (queryParts.length === 0) {
        throw new Error('No data provided for update');
    }

    queryParams.push(userId);
    const query = `UPDATE users SET ${queryParts.join(', ')} WHERE id = ?`;

    await pool.query(query, queryParams);
};

export default updateUserModel;
