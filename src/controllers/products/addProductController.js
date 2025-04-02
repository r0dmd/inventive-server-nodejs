import { validateSchemaUtil, generateErrorUtil } from '../../utils/index.js';

import { productSchema } from '../../schemas/products/index.js';

import {
    addProductModel,
    selectProductByNameAndUserIdModel,
} from '../../models/products/index.js';

// ------------------------------------------
const addProductController = async (req, res, next) => {
    try {
        await validateSchemaUtil(productSchema, req.body);

        const { productName, description, quantity } = req.body;

        const productExists = await selectProductByNameAndUserIdModel(
            productName,
            req.user.id,
        );
        if (productExists)
            generateErrorUtil('You already have this product', 409);

        const newProductId = await addProductModel(
            req.user.id,
            productName,
            description,
            quantity,
        );
        if (newProductId < 1)
            generateErrorUtil('Error adding product to the database', 400);

        res.status(201).send({
            status: 'ok',
            message: 'Product added successfully',
        });
    } catch (err) {
        next(err);
    }
};
export default addProductController;
