import type { NextFunction, Request, Response } from "express";
import { updateUserModel } from "../../models/users/index";
import { generateErrorUtil } from "../../utils/index";

// ------------------------------------------
// Controller function to update the username and password
const updateUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { newUsername } = req.body;
    if (!newUsername) throw generateErrorUtil("Missing fields", 400);

    if (!req.user) throw generateErrorUtil("User info missing in request", 401);

    const affectedRows = await updateUserModel(req.user.id, newUsername);
    if (affectedRows < 1)
      throw generateErrorUtil("There was an error updating the user data", 500);

    res.send({
      status: "ok",
      message: "User updated successfully",
      data: { newUsername },
    });
  } catch (err) {
    next(err);
  }
};

export default updateUserController;
