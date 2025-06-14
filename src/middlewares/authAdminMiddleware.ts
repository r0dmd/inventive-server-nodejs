import { generateErrorUtil } from "../utils/index.js";

// ------------------------------------------
const authAdminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    throw generateErrorUtil("Unauthorized", 403);
  }

  // User is admin, continue
  next();
};

export default authAdminMiddleware;
