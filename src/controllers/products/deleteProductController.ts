import type { NextFunction, Request, Response } from "express";
import {
  deleteProductModel,
  selectProductByIdModel,
} from "../../models/products/index";
import { generateErrorUtil } from "../../utils/index";

// ------------------------------------------
const deleteProductController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const productId = Number(req.params.productId);
    if (Number.isNaN(productId))
      throw generateErrorUtil("Invalid product ID", 400);

    const productToDelete = await selectProductByIdModel(productId);
    if (productToDelete.length === 0)
      throw generateErrorUtil("Product not found", 404);

    const affectedRows = await deleteProductModel(productId);
    if (affectedRows < 1)
      throw generateErrorUtil("There was an error deleting this product", 500);

    res.send({
      status: "ok",
      message: "Product deleted",
    });
  } catch (err) {
    next(err);
  }
};

export default deleteProductController;
