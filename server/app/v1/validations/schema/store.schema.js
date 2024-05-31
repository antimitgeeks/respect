const Joi = require("joi");

exports.addNopSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    address: Joi.string().required(),
    password: Joi.string().required(),
    isActive: Joi.boolean().optional(),
    number: Joi.string().required(),
});

