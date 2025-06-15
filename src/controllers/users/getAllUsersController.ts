import type { NextFunction, Request, Response } from "express";
import { selectAllUsersModel } from "../../models/users/index";

// ------------------------------------------
const getAllUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const users = await selectAllUsersModel();

    // If we reach this point, that means there's at least 1 user, even if it's the admin, so it would be useless to specify a "there are no users" error here

    res.send({
      status: "ok",
      data: { users },
    });
  } catch (err) {
    next(err);
  }
};

export default getAllUsersController;
