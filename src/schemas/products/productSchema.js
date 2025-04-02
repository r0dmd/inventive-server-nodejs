import Joi from 'joi';

const productSchema = Joi.object({
    product: Joi.string().min(1).max(50).required(),
    description: Joi.string().min(1).max(100).optional(),
    quantity: Joi.number().min(0).max(999).optional(),
});

export default productSchema;
