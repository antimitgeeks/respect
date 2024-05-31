const schema = require("./schema/store.schema.js");
const statusCode = require("../constants/statusCodes.js");

exports.addNop = async (req, res, next) => {
    const { error } = schema.addNopSchema.validate(req.body);
    if (error) {
        res.status(statusCode.BAD_REQUEST).json({ error: error.details[0].message });
    } else {
        next();
    }
};

