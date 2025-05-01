import { generateErrorUtil } from '../../utils/index.js';
import {
    updateProductModel,
    selectProductByIdModel,
} from '../../models/products/index.js';

// ------------------------------------------

const updateProductController = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const { productName, description, quantity } = req.body;

        if (!productName && !description && !quantity) {
            generateErrorUtil(
                'You must provide at least one field to update.',
                400,
            );
        }

        const existingProduct = await selectProductByIdModel(productId);
        if (!existingProduct) {
            generateErrorUtil('Product not found', 404);
        }

        const dataToUpdate = {};
        if (productName) dataToUpdate.product = productName;
        if (description) dataToUpdate.description = description;
        if (quantity) dataToUpdate.quantity = quantity;
        await updateProductModel(productId, dataToUpdate);

        res.send({
            status: 'ok',
            message: 'Product updated successfully',
        });
    } catch (err) {
        next(err);
    }
};

export default updateProductController;
