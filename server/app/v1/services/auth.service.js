const { AdminDetails } = require("../constants/constants");
const { SuccessMessage, ErrorMessage } = require("../constants/messages.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const emailConfig = require('../config/email');
const emailTemplates = require('../utils/emailTemplate.js');

const db = require("../models");
const Users = db.users;


// login service 
exports.login = async (details) => {
    // check email exist or not 
    const user = await Users.findOne({ where: { email: details.email } });
    if (!user) {
        return { status: false, message: `User ${ErrorMessage.NOT_FOUND}` };
    }
    // Compare password
    const isPasswordValid = await bcrypt.compare(details.password, user.password);
    if (!isPasswordValid) {
        return { status: false, message: `${ErrorMessage.INVALID_CREDENTIAL}` };
    }
    // create jwt token
    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.JWT_EXPIRE_TIME }
    );
    return { status: true, message: { accessToken: token } };
}

//  register service
exports.register = async (details) => {
    const userDetails = await Users.create(details);
    // remove password
    delete userDetails.dataValues.password;
    return userDetails;
}

// check user exist by email
exports.userExistByEmail = async (email) => {
    const userDetails = await Users.findOne({ where: { email } });
    return userDetails;
}

// check user exist by id
exports.userExistById = async (id) => {
    const userDetails = await Users.findOne({ where: { id } });
    return userDetails;
}

// reset user password by email
exports.resetPassword = async (email, id) => {
    const transporter = nodemailer.createTransport(emailConfig);
    const mailOptions = emailTemplates.resetLink(email, `${process.env.RESET_PASSWORD_LINK}/${id}`);
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(`Reset Password ${ErrorMessage.EMAIL_NOT_SEND}`, error);
        } else {
            console.log(`Reset Password ${SuccessMessage.EMAIL_SEND}`, info.response);
        }
    });
    return true;
}

// forgot user password by email
exports.forgotPassword = async (id, password) => {
    const hashPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUND));
    await Users.update({ password: hashPassword }, { where: { id } });
    return true;
}