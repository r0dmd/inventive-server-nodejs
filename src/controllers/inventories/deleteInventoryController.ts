import {
  deleteInventoryModel,
  selectInventoryByIdModel,
} from "../../models/inventories/index.js";
import { generateErrorUtil } from "../../utils/index.js";

// ------------------------------------------
const deleteInventoryController = async (req, res, next) => {
  try {
    const { inventoryId } = req.params;

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
