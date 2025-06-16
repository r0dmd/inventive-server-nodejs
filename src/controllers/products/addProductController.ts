import { generateErrorUtil, validateSchemaUtil } from "../../utils/index";

import { productSchema } from "../../schemas/products/index";

import {
  addProductModel,
  selectProductByNameAndInventoryIdModel,
} from "../../models/products/index";

import type { NextFunction, Request, Response } from "express";

// ------------------------------------------
const addProductController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const inventoryId = Number(req.params.inventoryId);
    if (Number.isNaN(inventoryId))
      throw generateErrorUtil("Invalid inventory ID", 400);

    await validateSchemaUtil(productSchema, req.body);

    const { productName, description, quantity } = req.body;

    const productExists = await selectProductByNameAndInventoryIdModel(
      productName,
      inventoryId,
    );
    if (productExists)
      throw generateErrorUtil("You already have this product", 409);

    const newProductId = await addProductModel(
      inventoryId,
      productName,
      description,
      quantity,
    );
    if (newProductId < 1)
      throw generateErrorUtil("Error adding product to the database", 400);

    res.status(201).send({
      status: "ok",
      message: "Product added successfully",
    });
  } catch (err) {
    next(err);
  }
};
export default addProductController;
