import Joi from "joi";

const inventorySchema = Joi.object({
  inventoryName: Joi.string().min(1).max(80).required(),
});

export default inventorySchema;
