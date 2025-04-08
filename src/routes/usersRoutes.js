// Note: It's good practice not to include in the URL information that is contained in the token, except there is a special reason to do so. Therefore we don't put ":userId" as a path param in routes which require authentication, because they already have the token and its info

import express from 'express';

// TODO Controllers
import {
    addUserController,
    loginUserController,
    getUserController,
    updateUserController,
    updatePassController,
    getAllUsersController,
    deleteUserController,
} from '../controllers/users/index.js';

// TODO middlewares
import {
    authAdminMiddleware,
    authUserMiddleware,
} from '../middlewares/index.js';

// ------------------------------------------
const router = express.Router();

// Public routes
router.post('/register', addUserController);
router.post('/login', loginUserController);

// User routes (authentication required)
router.get('/profile', authUserMiddleware, getUserController);
router.put('/profile', authUserMiddleware, updateUserController);
router.patch('/profile/password', authUserMiddleware, updatePassController);

// Admin routes
router.get('/', authUserMiddleware, authAdminMiddleware, getAllUsersController);
router.delete(
    '/users/:userId/deactivate',
    authUserMiddleware,
    authAdminMiddleware,
    deleteUserController,
);

export default router;
