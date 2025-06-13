import {
  selectInventoryByIdModel,
  updateInventoryModel,
} from "../../models/inventories/index.js";
import { generateErrorUtil } from "../../utils/index.js";

// ------------------------------------------
const updateInventoryController = async (req, res, next) => {
  try {
    const { inventoryId } = req.params;
    const { newInventoryName } = req.body;

    if (!newInventoryName) {
      generateErrorUtil("Missing fields", 400);
    }

    const [inventoryData] = await selectInventoryByIdModel(inventoryId);
    if (inventoryData.length < 1) {
      generateErrorUtil("Inventory not found", 404);
    }

    const { affectedRows, updatedInventory } = await updateInventoryModel(
      inventoryId,
      newInventoryName,
    );

    if (affectedRows === 0) {
      generateErrorUtil("Failed to update inventory", 500);
    }

    res.send({
      status: "ok",
      message: "Inventory updated successfully",
      data: {
        id: inventoryId,
        inventory: updatedInventory,
        modifiedAt: new Date(),
      },
    });
  } catch (err) {
    next(err);
  }
};

export default updateInventoryController;
