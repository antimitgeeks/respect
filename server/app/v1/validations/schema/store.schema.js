const Joi = require("joi");

exports.addNopSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    isActive: Joi.boolean().optional(),
    number: Joi.string().allow(null, '').optional(),
});

