import { selectUserByIdModel } from "../../models/users/index.js";
import { generateErrorUtil } from "../../utils/index.js";

const getUserController = async (req, res, next) => {
  try {
    const user = await selectUserByIdModel(req.user.id);

    if (!user) {
      generateErrorUtil("User not found", 404);
    }

    res.send({
      status: "ok",
      data: { user },
    });
  } catch (err) {
    next(err);
  }
};

export default getUserController;
