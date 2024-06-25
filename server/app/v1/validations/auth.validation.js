const schema = require("./schema/auth.schema.js");
const statusCode = require("../constants/statusCodes.js");

exports.login = async (req, res, next) => {
    const { error } = schema.loginSchema.validate(req.body);
    if (error) {
        res.status(statusCode.BAD_REQUEST).json({ error: error.details[0].message });
    } else {
        next();
    }
};

exports.register = async (req, res, next) => {
    const { error } = schema.registerSchema.validate(req.body);
    if (error) {
        res.status(statusCode.BAD_REQUEST).json({ error: error.details[0].message });
    } else {
        next();
    }
};

exports.resetPassword = async (req, res, next) => {
    const { error } = schema.resetPasswordSchema.validate(req.body);
    if (error) {
        res.status(statusCode.BAD_REQUEST).json({ error: error.details[0].message });
    } else {
        next();
    }
};

exports.forgotPassword = async (req, res, next) => {
    const { error } = schema.forgotPasswordSchema.validate({
        id: req.params.id,
        role: req.body.role,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    });
    if (error) {
        res.status(statusCode.BAD_REQUEST).json({ error: error.details[0].message });
    } else {
        next();
    }
};

exports.list = async (req, res, next) => {
    const { error } = schema.listSchema.validate(req.body);
    if (error) {
        res.status(statusCode.BAD_REQUEST).json({ error: error.details[0].message });
    } else {
        next();
    }
};

exports.id = async (req, res, next) => {
    const { error } = schema.idSchema.validate({ id: req.params.id });
    if (error) {
        res.status(statusCode.BAD_REQUEST).json({ error: error.details[0].message });
    } else {
        next();
    }
};

exports.npoImageType = async (req, res, next) => {
    const { error } = schema.npoImageTypeSchema.validate({ type: req.query.type });
    if (error) {
        res.status(statusCode.BAD_REQUEST).json({ error: error.details[0].message });
    } else {
        next();
    }
};
