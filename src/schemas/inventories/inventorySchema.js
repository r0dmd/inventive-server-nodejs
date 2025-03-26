import Joi from 'joi';

const inventorySchema = Joi.object({
    inventory: Joi.string().min(1).max(80).required(),
});

export default inventorySchema;
