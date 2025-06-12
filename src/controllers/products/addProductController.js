import { generateErrorUtil, validateSchemaUtil } from "../../utils/index.js";

import { productSchema } from "../../schemas/products/index.js";

import {
  addProductModel,
  selectProductByNameAndInventoryIdModel,
} from "../../models/products/index.js";

// ------------------------------------------
const addProductController = async (req, res, next) => {
  try {
    await validateSchemaUtil(productSchema, req.body);

    const { productName, description, quantity } = req.body;
    const { inventoryId } = req.params;

    const productExists = await selectProductByNameAndInventoryIdModel(
      productName,
      inventoryId,
    );
    if (productExists) generateErrorUtil("You already have this product", 409);

    const newProductId = await addProductModel(
      inventoryId,
      productName,
      description,
      quantity,
    );
    if (newProductId < 1)
      generateErrorUtil("Error adding product to the database", 400);

    res.status(201).send({
      status: "ok",
      message: "Product added successfully",
    });
  } catch (err) {
    next(err);
  }
};
export default addProductController;
