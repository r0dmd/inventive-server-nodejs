import Joi from 'joi';

// ------------------------------------------
const updatePassSchema = Joi.object().keys({
    oldPass: Joi.string().min(7).max(30).required(),
    newPass: Joi.string().min(7).max(30).required(),
});

export default updatePassSchema;
