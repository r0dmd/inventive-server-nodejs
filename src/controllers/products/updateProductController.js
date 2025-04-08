// src/controllers/products/updateProductController.js

import { generateErrorUtil } from '../../utils/index.js';
import { updateProductModel, selectProductByIdModel } from '../../models/products/index.js';

const updateProductController = async (req, res, next) => {
    try {
        //Get the product ID from URL params
        const { productId } = req.params;

        // Extract fields to update from the request body
        const { product, description, quantity } = req.body;

        // Validate that at least one field is provided
        if (!product && !description && !quantity) {
            generateErrorUtil('You must provide at least one field to update.', 400);
        }

        // Check if the product exists in the database
        const existingProduct = await selectProductByIdModel(productId);

        if (!existingProduct) {
            generateErrorUtil('Product not found', 404);
        }

        // Check if the product belongs to the authenticated user
        if (existingProduct.userId !== req.user.id) {
            generateErrorUtil('You do not have permission to update this product.', 403);
        }

        //Build the object with only the fields to update
        const dataToUpdate = {};
        if (product) dataToUpdate.product = product;
        if (description) dataToUpdate.description = description;
        if (quantity) dataToUpdate.quantity = quantity;

        // Call the model to perform the update in the database
        await updateProductModel(productId, dataToUpdate);

        // Send response back to the client
        res.send({
            status: 'ok',
            message: 'Product updated successfully',
        });
    } catch (err) {
        next(err);
    }
};

export default updateProductController;
