const Joi = require("joi");

exports.addStoreSchema = Joi.object({
    name: Joi.string().required(),
    accessToken: Joi.string().required(),
    apiKey: Joi.string().required(),
    apiPassword: Joi.string().required(),
    isActive: Joi.boolean().optional()
});

