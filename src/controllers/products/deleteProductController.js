import {
    deleteProductModel,
    selectProductByIdModel,
} from '../../models/products/index.js';
import { generateErrorUtil } from '../../utils/index.js';

// ------------------------------------------
const deleteProductController = async (req, res, next) => {
    try {
        const { productId } = req.params;

        const productToDelete = await selectProductByIdModel(productId);
        if (productToDelete.length === 0)
            generateErrorUtil('Product not found', 404);

        const affectedRows = await deleteProductModel(productId);
        if (affectedRows < 1)
            generateErrorUtil('There was an error deleting this product', 500);

        res.send({
            status: 'ok',
            message: 'Product deleted',
        });
    } catch (err) {
        next(err);
    }
};

export default deleteProductController;
