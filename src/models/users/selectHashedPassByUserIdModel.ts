// We need the function which returns the connection to the DB
import getPool from "../../db/getPool";
import type { HashedPassRow } from "../../types/user";

// ------------------------------------------
const selectHashedPassByUserIdModel = async (id: number) => {
  // NOTE: About try-catch in models. Not mandatory if the error management is done in a higher layer, like in the controllers or a global error middleware. This allows the model to focus exclusively on the DB query. Notwithstanding, including a try-catch could be useful to catch specific errors from the DB (connection, syntax...) and to throw custom messages

  const pool = await getPool();

  // NOTE: pool.query returns an array of arrays; inside the first position the data, and inside the second a lot of addition info which is commonly unnecessary. Therefore using destructuring ("[users] = ...") we only take the first position array, the one with the actual results
  const [password] = await pool.query<HashedPassRow[]>(
    "SELECT password FROM users WHERE id = ?",
    [id],
  );

  return password[0];
};

export default selectHashedPassByUserIdModel;
