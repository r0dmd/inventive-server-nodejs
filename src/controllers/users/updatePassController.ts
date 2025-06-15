import type { NextFunction, Request, Response } from "express";
import {
  updateLastAuthUpdateModel,
  updatePassModel,
} from "../../models/users/index";
import { updatePassSchema } from "../../schemas/users/index";
import { generateErrorUtil, validateSchemaUtil } from "../../utils/index";

// ------------------------------------------
const updatePassController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await validateSchemaUtil(updatePassSchema, req.body);

    const { oldPass, newPass } = req.body;

    if (!req.user) throw generateErrorUtil("User info missing in request", 401);
    const userId = req.user.id;

    const affectedRows = await updatePassModel(userId, oldPass, newPass);
    if (affectedRows === 0)
      throw generateErrorUtil("Error while updating password", 400);

    // It's an auth controller, so we need to include the auth update date
    await updateLastAuthUpdateModel(userId);

    res.send({
      status: "ok",
      message: "Password updated",
    });
  } catch (err) {
    next(err);
  }
};

export default updatePassController;
