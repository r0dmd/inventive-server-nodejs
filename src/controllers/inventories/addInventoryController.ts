import { generateErrorUtil, validateSchemaUtil } from "../../utils/index";

import { inventorySchema } from "../../schemas/inventories/index";

import {
  addInventoryModel,
  selectInventoryByNameAndUserIdModel,
} from "../../models/inventories/index";

// ------------------------------------------
const addInventoryController = async (req, res, next) => {
  try {
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
