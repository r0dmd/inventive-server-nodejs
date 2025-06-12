import {
  addUserModel,
  selectUserByUsernameModel,
} from "../../models/users/index.js";
import { userSchema } from "../../schemas/users/index.js";

import { generateErrorUtil, validateSchemaUtil } from "../../utils/index.js";

// ------------------------------------------
const addUserController = async (req, res, next) => {
  try {
    // Note: The data validation goes before extracting them from the body, to make sure all the required fields are present and in the proper format *before* processing them in the code. If we don't use a validation schema, we would have to do additional checks later on, such as `if (!username || !password) generateErrorUtil("Missing fields", 400);`, which is less efficient and more prone to repetitive errors
    await validateSchemaUtil(userSchema, req.body);

    // REQ: Represents the client's query and contains its info. Here we obtain the necessary fields from the body once validated
    const { username, password } = req.body;

    // Checks before inserting into the DB
    const usernameAlreadyExists = await selectUserByUsernameModel(username);
    if (usernameAlreadyExists) generateErrorUtil("Unavailable username", 409);

    // User insertion. Note: `addUserModel` returns `res.insertId` (the ID of that row), which will always be >=1 in case of success. So if the returned value is <1, that means there has been an error in the insertion
    if ((await addUserModel(username, password)) < 1)
      generateErrorUtil("Database insertion error", 400);

    // RES: Sends a response to the client
    // Code 200 (OK): General success, in operations such as queries and updates, sent by default, no need to explicitly write it
    // Code 201 (Created): Needed when a new resource is generated successfully in the server, that is, DB insertions
    res.status(201).send({
      status: "ok",
      message: "User registered",
    });
  } catch (err) {
    // NEXT: Function which allows passing the control to the next middleware in the execution pile
    next(err);
  }
};

export default addUserController;
