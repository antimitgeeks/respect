const Joi = require("joi");
const { NPO_TYPE } = require('../../constants/enum')

const emailSchema = Joi.string().email().required()

exports.loginSchema = Joi.object({
    email: emailSchema.required(),
    password: Joi.string().required(),
    role: Joi.string().optional(),
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
    email: emailSchema.required(),
    role: Joi.string().valid('admin', 'npo').required(),
});

exports.forgotPasswordSchema = Joi.object({
    role: Joi.string().valid('npo', 'admin').required(),
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

exports.npoImageTypeSchema = Joi.object({
    type: Joi.valid(NPO_TYPE.LOGO, NPO_TYPE.BANNER, NPO_TYPE.TEXT).required()
})