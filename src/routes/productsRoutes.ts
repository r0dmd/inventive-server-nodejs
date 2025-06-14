import express from "express";
import {
  addProductController,
  deleteProductController,
  getUserProductsController,
  updateProductController,
} from "../controllers/products/index";
import { authUserMiddleware } from "../middlewares/index";

// ------------------------------------------
const router = express.Router();

router.post("/:inventoryId/new", authUserMiddleware, addProductController);
router.get("/:inventoryId", authUserMiddleware, getUserProductsController);
router.put(
  "/:inventoryId/:productId",
  authUserMiddleware,
  updateProductController,
);
router.delete(
  "/:inventoryId/:productId/delete",
  authUserMiddleware,
  deleteProductController,
);

export default router;
