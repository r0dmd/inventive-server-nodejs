import { generateErrorUtil, validateSchemaUtil } from "../../utils/index";

import { inventorySchema } from "../../schemas/inventories/index";

import {
  addInventoryModel,
  selectInventoryByNameAndUserIdModel,
} from "../../models/inventories/index";

import type { NextFunction, Request, Response } from "express";

// ------------------------------------------
const addInventoryController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.user) throw generateErrorUtil("User info missing in request", 401);

    await validateSchemaUtil(inventorySchema, req.body);
    const { inventoryName } = req.body;

    const inventoryExists = await selectInventoryByNameAndUserIdModel(
      inventoryName,
      req.user.id,
    );

    if (inventoryExists) {
      throw generateErrorUtil("You already have this inventory", 409);
    }

    const newInventoryId = await addInventoryModel(req.user.id, inventoryName);

    if (newInventoryId < 1)
      throw generateErrorUtil("Error adding inventory to the database", 400);

    res.status(201).send({
      status: "ok",
      message: "Inventory added successfully",
    });
  } catch (err) {
    next(err);
  }
};
export default addInventoryController;
