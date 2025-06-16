import type { NextFunction, Request, Response } from "express";
import selectProductsByUserIdModel from "../../models/products/selectProductsByUserIdModel";
import { generateErrorUtil } from "../../utils/index";

// ------------------------
const getUserProductsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) throw generateErrorUtil("User info missing in request", 401);
    const userId = req.user.id;

    const products = await selectProductsByUserIdModel(userId);

    if (!products || products.length === 0)
      throw generateErrorUtil("No products found for this user", 404);

    res.send({
      status: "ok",
      data: { products },
    });
  } catch (err) {
    next(err);
  }
};

export default getUserProductsController;
