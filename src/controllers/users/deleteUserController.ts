import {
  deleteUserByIdModel,
  selectUserByIdModel,
} from "../../models/users/index";
import { generateErrorUtil } from "../../utils/index";

// ------------------------------------------
const deleteUserController = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Fetch the user to ensure it exists
    const user = await selectUserByIdModel(userId);
    if (!user) {
      throw generateErrorUtil("User not found", 404);
    }

    // Delete the user from the database
    const userDeleted = await deleteUserByIdModel(userId);
    if (!userDeleted) {
      throw generateErrorUtil("User not found", 404);
    }

    res.send({
      status: "ok",
      message: "User deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

export default deleteUserController;
