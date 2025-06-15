import type { NextFunction, Request, Response } from "express";
import {
  deleteUserByIdModel,
  selectUserByIdModel,
} from "../../models/users/index";
import { generateErrorUtil } from "../../utils/index";

// ------------------------------------------
const deleteUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = Number(req.params.userId);
    if (Number.isNaN(userId)) throw generateErrorUtil("Invalid user ID", 400);

    const user = await selectUserByIdModel(userId);
    if (!user) throw generateErrorUtil("User not found", 404);

    const userDeleted = await deleteUserByIdModel(userId);
    if (!userDeleted) throw generateErrorUtil("User not found", 404);

    res.send({
      status: "ok",
      message: "User deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

export default deleteUserController;
