import selectProductsByUserIdModel from "../../models/products/selectProductsByUserIdModel.js";
import { generateErrorUtil } from "../../utils/index.js";

const getUserProductsController = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const products = await selectProductsByUserIdModel(userId);

    if (!products || products.length === 0) {
      throw generateErrorUtil("No products found for this user", 404);
    }

    res.send({
      status: "ok",
      data: { products },
    });
  } catch (err) {
    next(err);
  }
};

export default getUserProductsController;
