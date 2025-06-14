import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
  selectHashedPassByUserIdModel,
  selectUserByUsernameModel,
  updateLastAuthUpdateModel,
} from "../../models/users/index.js";
import { userSchema } from "../../schemas/users/index.js";

import { generateErrorUtil, validateSchemaUtil } from "../../utils/index.js";

const { SECRET, TOKEN_EXPIRATION } = process.env;

// ------------------------------------------
const loginUserController = async (req, res, next) => {
  try {
    await validateSchemaUtil(userSchema, req.body);
    const { username, password } = req.body;

    // Username check
    const user = await selectUserByUsernameModel(username);
    if (!user) throw generateErrorUtil("User not found", 404);

    // Password check
    const hashedPass = await selectHashedPassByUserIdModel(user.id);
    const passwordValid = await bcrypt.compare(password, hashedPass.password);
    if (!passwordValid) throw generateErrorUtil("Invalid password", 401);

    // Token generation
    const tokenInfo = {
      id: user.id,
      username: user.username,
      role: user.role,
    };
    // jwt.sign(payload, secretOrPrivateKey, [options, callback])
    const token = jwt.sign(tokenInfo, SECRET, {
      expiresIn: TOKEN_EXPIRATION,
    });

    // Since it's an authentication controller, we must include the DB update date of that user, to check if the token is valid or not later on
    await updateLastAuthUpdateModel(user.id);

    // Response with the token
    res.send({
      status: "ok",
      data: { token },
    });
  } catch (err) {
    next(err);
  }
};

export default loginUserController;
