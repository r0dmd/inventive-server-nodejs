// We need the function which returns the connection to the DB
import getPool from '../../db/getPool.js';

// ------------------------------------------
const selectUserByUsernameModel = async (username) => {
    // NOTE: About try-catch in models. Not mandatory if the error management is done in a higher layer, like in the controllers or a global error middleware. This allows the model to focus exclusively on the DB query. Notwithstanding, including a try-catch could be useful to catch specific errors from the DB (connection, syntax...) and to throw custom messages

    const pool = await getPool();

    // NOTE: pool.query returns an array of arrays; inside the first position the data, and inside the second a lot of addition info which is commonly unnecessary. Therefore using destructuring ("[users] = ...") we only take the first position array, the one with the actual results
    const [users] = await pool.query(
        `SELECT id, username FROM users WHERE username = ?`,
        [username],
    );

    // NOTE: We assume that the username is unique (which by design it is), so that the query should only return either a single match or none. For that reason, with "users[0]" we directly extract the first (and only) result, or null if it doesn't exist
    return users[0] || null;
};

export default selectUserByUsernameModel;
