import Joi from 'joi';

const userSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(25).required(),
    password: Joi.string().min(7).max(30).required(),
});

export default userSchema;
