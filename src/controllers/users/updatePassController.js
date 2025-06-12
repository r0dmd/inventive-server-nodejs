import {
  updateLastAuthUpdateModel,
  updatePassModel,
} from "../../models/users/index.js";
import { updatePassSchema } from "../../schemas/users/index.js";
import { generateErrorUtil, validateSchemaUtil } from "../../utils/index.js";

// ------------------------------------------
const updatePassController = async (req, res, next) => {
  try {
    await validateSchemaUtil(updatePassSchema, req.body);

    const { oldPass, newPass } = req.body;
    const userId = req.user.id;

    const affectedRows = await updatePassModel(userId, oldPass, newPass);
    if (affectedRows === 0)
      generateErrorUtil("Error while updating password", 400);

    // It's an auth controller, so we need to include the auth update date
    await updateLastAuthUpdateModel(userId);

    res.send({
      status: "ok",
      message: "Password updated",
    });
  } catch (err) {
    next(err);
  }
};

export default updatePassController;
