const Joi = require("joi");

const emailSchema = Joi.string().email().required()

exports.loginSchema = Joi.object({
    email: emailSchema.required(),
    password: Joi.string().required()
});

exports.registerSchema = Joi.object({
    name: Joi.string().required(),
    email: emailSchema.required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
    role: Joi.string().valid('Admin', 'User').required(),
    isActive: Joi.boolean().required()
});

exports.resetPasswordSchema = Joi.object({
    email: emailSchema.required()
});

exports.forgotPasswordSchema = Joi.object({
    id: Joi.number().required(),
    password: Joi.string().min(3).required(),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')),
})

exports.listSchema = Joi.object({
    limit: Joi.number().optional(),
    offset: Joi.number().optional(),
})

exports.idSchema = Joi.object({
    id: Joi.number().required(),
})