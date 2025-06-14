import express from "express";

import {
  addInventoryController,
  deleteInventoryController,
  getUserInventoriesController,
  updateInventoryController,
} from "../controllers/inventories/index";

import { authUserMiddleware } from "../middlewares/index";

// ------------------------------------------
const router = express.Router();

router.post("/new", authUserMiddleware, addInventoryController);
router.get("/", authUserMiddleware, getUserInventoriesController);
router.put(
  "/:inventoryId/update",
  authUserMiddleware,
  updateInventoryController,
);
router.delete(
  "/:inventoryId/delete",
  authUserMiddleware,
  deleteInventoryController,
);

export default router;
