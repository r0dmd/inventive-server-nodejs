import type { NextFunction, Request, Response } from "express";
import {
  selectProductByIdModel,
  updateProductModel,
} from "../../models/products/index";
import { generateErrorUtil } from "../../utils/index";
import type { ProductUpdatePayload } from "../../types/product";

// ---------------------------------------
const updateProductController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const productId = Number(req.params.productId);
    const { productName, description, quantity } = req.body;

    if (Number.isNaN(productId)) {
      throw generateErrorUtil("Invalid product ID", 400);
    }

    if (!productName && !description && !quantity) {
      throw generateErrorUtil(
        "You must provide at least one field to update.",
        400,
      );
    }

    const existingProduct = await selectProductByIdModel(productId);
    if (!existingProduct) {
      throw generateErrorUtil("Product not found", 404);
    }

    const dataToUpdate: ProductUpdatePayload = {};
    if (productName) dataToUpdate.product = productName;
    if (description) dataToUpdate.description = description;
    if (quantity) dataToUpdate.quantity = quantity;

    await updateProductModel(productId, dataToUpdate);

    res.send({
      status: "ok",
      message: "Product updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

export default updateProductController;
