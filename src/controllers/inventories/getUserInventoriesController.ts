import type { NextFunction, Request, Response } from "express";
import { selectUserInventoriesModel } from "../../models/inventories/index";
import { generateErrorUtil } from "../../utils/index";

// ------------------------------------------
const getUserInventoriesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.user) throw generateErrorUtil("User info missing in request", 401);

    const inventories = await selectUserInventoriesModel(req.user.id);

    res.send({
      status: "ok",
      data: { inventories },
    });
  } catch (err) {
    next(err);
  }
};

export default getUserInventoriesController;
