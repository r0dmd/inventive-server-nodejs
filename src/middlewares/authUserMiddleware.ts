import jwt from "jsonwebtoken";

import type { TokenPayload } from "../types/tokenPayload";

import type { NextFunction, Request, Response } from "express";

import { generateErrorUtil } from "../utils/index";
import { CustomError } from "../utils/generateErrorUtil";

// ----------------------------
// Intermediate controller function that decrypts the token and adds the user's information to the request object.
const authUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Get the token from the req header
    // const authorization = req.headers.authorization;
    // or destructuring:
    const { authorization } = req.headers;

    if (!authorization) {
      throw generateErrorUtil("Authorization header is missing", 401);
    }

    // Extract the token string from "Bearer <token>" if present.
    // This is important because Authorization headers often come with the "Bearer " prefix,
    // and jwt.verify expects only the raw token without the prefix.
    const token = authorization.startsWith("Bearer ")
      ? authorization.slice(7)
      : authorization;

    // Decrypt the token with the env variable SECRET
    const SECRET = process.env.SECRET;
    if (!SECRET) {
      throw generateErrorUtil("JWT secret is not defined", 500);
    }
    // NOTE: jwt.verify can return JwtPayload | string, so we check the type
    const decoded = jwt.verify(token, SECRET);

    if (typeof decoded !== "object" || !decoded) {
      throw generateErrorUtil("Invalid token payload", 401);
    }

    // We cast to `unknown` first because jwt.verify() has a loose return type (string | JwtPayload).
    // Even if we validate the structure afterward, TS doesn't trust that the result is safe to cast directly.
    // So we explicitly tell the compiler: "Trust me — after validation, this is a TokenPayload".
    // This double assertion is safe here because we've already verified `decoded` is a non-null object.
    const tokenInfo = decoded as unknown as TokenPayload;

    if (
      typeof tokenInfo.id !== "number" ||
      typeof tokenInfo.username !== "string" ||
      typeof tokenInfo.role !== "string"
    ) {
      throw generateErrorUtil("Invalid token structure", 401);
    }

    // We add a custom property to the request object to store the user's information.
    // NOTE: We extract only the necessary user fields from the payload and assign them to req.user explicitly. This ensures we avoid attaching sensitive or unnecessary data (like token metadata)to the request object, improving security, type safety, and keeping the user object clean and predictable throughout the app.
    req.user = {
      id: tokenInfo.id,
      username: tokenInfo.username,
      role: tokenInfo.role,
    };

    // Pass control to the next middleware. This will allow the next middleware to access the user properties like user.id
    next();
  } catch (err) {
    console.error(err);
    if (err instanceof CustomError) {
      // If it's already a CustomError, rethrow it as is.
      throw err;
    }
    // If it's NOT a CustomError, wrap it in a generic CustomError:
    throw generateErrorUtil("Invalid token", 401);
  }
};

export default authUserMiddleware;
