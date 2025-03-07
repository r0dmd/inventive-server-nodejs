// No generateErrorUtil, as we make used of the error thrown by the catch of the higher layer where this is inserted

// This function compares the received data from the client with the Joi schema. Returns nothing, only throws an exception if the data doesn't fit the schema
const validateSchemaUtil = async (schema, data) => {
    try {
        await schema.validateAsync(data);
    } catch (err) {
        err.httpStatus = 400;
        throw err;
    }
};

export default validateSchemaUtil;
