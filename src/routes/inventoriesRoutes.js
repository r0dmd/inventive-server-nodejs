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

router.post('/new', authUserMiddleware, addInventoryController);
router.get('/', authUserMiddleware, getUserInventoriesController);
router.put(
    '/:inventoryId/update',
    authUserMiddleware,
    updateInventoryController,
);
router.delete(
    '/:inventoryId/delete',
    authUserMiddleware,
    deleteInventoryController,
);

export default router;
