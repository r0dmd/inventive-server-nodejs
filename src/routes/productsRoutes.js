import express from 'express';
import {
    addProductController,
    getUserProductsController,
    updateProductController,
    deleteProductController,
} from '../controllers/products/index.js';
import { authUserMiddleware } from '../middlewares/index.js';

// ------------------------------------------
const router = express.Router();

router.post('/new', authUserMiddleware, addProductController);
router.get('/', authUserMiddleware, getUserProductsController);
router.put('/:productId', authUserMiddleware, updateProductController);
router.delete(
    '/:productId/delete',
    authUserMiddleware,
    deleteProductController,
);

export default router;
