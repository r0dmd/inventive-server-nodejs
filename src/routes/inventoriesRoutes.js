import express from 'express';

import {
    addInventoryController,
    updateInventoryController,
    getUserInventoriesController,
    deleteInventoryController,
} from '../controllers/inventories/index.js';

import { authUserMiddleware } from '../middlewares/index.js';

// ------------------------------------------
const router = express.Router();

router.post('/inventories/new', authUserMiddleware, addInventoryController);
router.get('/inventories', authUserMiddleware, getUserInventoriesController);
router.put(
    '/inventories/:inventoryId/update',
    authUserMiddleware,
    updateInventoryController,
);
router.delete(
    '/inventories/:inventoryId/delete',
    authUserMiddleware,
    deleteInventoryController,
);

export default router;
