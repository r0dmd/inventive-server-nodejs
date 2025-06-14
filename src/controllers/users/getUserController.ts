import { selectUserByIdModel } from "../../models/users/index";
import { generateErrorUtil } from "../../utils/index";

import type { Request, NextFunction, Response } from "express";

// -------------------------------
const getUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // NOTE: Since user is optional on the type, TypeScript forces you to check its existence to avoid runtime errors.
    // Your authUserMiddleware guarantees req.user is added on successful auth, but the compiler doesn’t know that guarantees on the controller level — so you must verify or assert it.
    // This pattern also helps if a route is accessible without authentication or if middleware order changes.
    if (!req.user) {
      throw generateErrorUtil("User info missing in request", 401);
    }

    const user = await selectUserByIdModel(req.user.id);

    if (!user) {
      throw generateErrorUtil("User not found", 404);
    }

    res.send({
      status: "ok",
      data: { user },
    });
  } catch (err) {
    next(err);
  }
};

export default getUserController;
