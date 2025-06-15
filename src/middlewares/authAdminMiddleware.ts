import type { NextFunction, Request, Response } from "express";
import { generateErrorUtil } from "../utils/index";

// ------------------------------------------
// Middleware to protect admin-only routes
const authAdminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    throw generateErrorUtil("Authentication required", 401);
  }

  if (req.user.role !== "admin") {
    // User authenticated but not authorized
    throw generateErrorUtil("Admin access required", 403);
  }

  // User is admin, proceed
  next();
};

export default authAdminMiddleware;
