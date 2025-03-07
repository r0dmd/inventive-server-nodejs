import bcrypt from 'bcrypt';
import getPool from '../../db/getPool.js';

// ------------------------------------------
const addUserModel = async (username, password) => {
    const pool = await getPool();

    // Password encrypting
    const hashedPass = await bcrypt.hash(password, 10);

    // User insertion
    const [res] = await pool.query(
        `INSERT INTO users(username, password) VALUES (?, ?)`,
        [username, hashedPass],
    );

    // NOTE: pool.query returns an array, where the first element ([res]) is an object with details about the insertion op, including properties such as insertId (the ID of the inserted row) and affectedRows. Its second element (optional) contains information about the fields. Consequently, we use destructuring to obtain just 'res', and then we access res.insertId, with the ID of the newly added user
    return res.insertId;
};

export default addUserModel;
