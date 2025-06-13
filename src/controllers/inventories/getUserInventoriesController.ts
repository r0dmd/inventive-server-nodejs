import { selectUserInventoriesModel } from "../../models/inventories/index.js";

// ------------------------------------------
const getUserInventoriesController = async (req, res, next) => {
  try {
    const inventories = await selectUserInventoriesModel(req.user.id);

    res.send({
      status: "ok",
      data: { inventories },
    });
  } catch (err) {
    next(err);
  }
};

export default getUserInventoriesController;
