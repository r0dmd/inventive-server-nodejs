import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
  selectHashedPassByUserIdModel,
  selectUserByUsernameModel,
  updateLastAuthUpdateModel,
} from "../../models/users/index";
import { userSchema } from "../../schemas/users/index";

import { generateErrorUtil, validateSchemaUtil } from "../../utils/index";

import type { NextFunction, Request, Response } from "express";
import type { TokenPayload } from "../../types/user";

// ------------------------------------------
const loginUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
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
    const tokenInfo: TokenPayload = {
      id: user.id,
      username: user.username,
      role: user.role,
    };

    if (!process.env.SECRET || !process.env.TOKEN_EXPIRATION)
      throw generateErrorUtil("Missing environment variables");

    const tokenExpiry = process.env
      .TOKEN_EXPIRATION as `${number}${"s" | "m" | "h" | "d" | "y"}`;

    // jwt.sign(payload, secretOrPrivateKey, [options, callback])
    const token = jwt.sign(tokenInfo, process.env.SECRET, {
      expiresIn: tokenExpiry,
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
