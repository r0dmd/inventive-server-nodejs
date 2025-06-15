// Note: It's good practice not to include in the URL information that is contained in the token, except there is a special reason to do so. Therefore we don't put ":userId" as a path param in routes which require authentication, because they already have the token and its info

import express from "express";

import {
  addUserController,
  deleteUserController,
  getAllUsersController,
  getUserController,
  loginUserController,
  updatePassController,
  updateUserController,
} from "../controllers/users/index";

import { authAdminMiddleware, authUserMiddleware } from "../middlewares/index";

// ------------------------------------------
const router = express.Router();

router.post("/register", addUserController);
router.post("/login", loginUserController);

router.get("/profile", authUserMiddleware, getUserController);
router.put("/profile", authUserMiddleware, updateUserController);
router.patch("/profile/password", authUserMiddleware, updatePassController);

router.get("/", authUserMiddleware, authAdminMiddleware, getAllUsersController);
router.delete(
  "/:userId/deactivate",
  authUserMiddleware,
  authAdminMiddleware,
  deleteUserController,
);

export default router;
