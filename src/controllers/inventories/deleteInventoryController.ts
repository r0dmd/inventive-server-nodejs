import type { NextFunction, Request, Response } from "express";
import {
  deleteInventoryModel,
  selectInventoryByIdModel,
} from "../../models/inventories/index";
import { generateErrorUtil } from "../../utils/index";

// ------------------------------------------
const deleteInventoryController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const inventoryId = Number(req.params.userId);
    if (Number.isNaN(inventoryId))
      throw generateErrorUtil("Invalid inventory ID", 400);

    const inventoryToDelete = await selectInventoryByIdModel(inventoryId);
    if (inventoryToDelete.length === 0)
      throw generateErrorUtil("Inventory not found", 404);

    const affectedRows = await deleteInventoryModel(inventoryId);
    if (affectedRows < 1)
      throw generateErrorUtil(
        "There was an error deleting this inventory",
        500,
      );

    res.send({
      status: "ok",
      message: "Inventory deleted",
    });
  } catch (err) {
    next(err);
  }
};

export default deleteInventoryController;
