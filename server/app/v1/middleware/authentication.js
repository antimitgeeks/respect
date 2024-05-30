const jwt = require('jsonwebtoken');
const Utils = require('../utils/sendResponse')
const { SuccessMassage, ErrorMessage } = require('../constants/messages.js');
const statusCode = require('../constants/statusCodes.js');


exports.authenticate = async (req, res, next) => {
  const auth = req.headers.authorization;
  try {
    if (auth) {
      let token = auth.split(" ");
      if (token[0] == 'Bearer') {
        req.currUser = jwt.verify(token[1], process.env.JWT_SECRET_KEY);
        if (req.currUser) {
          next();
        } else {
          Utils.sendResponse(res, statusCode.UNAUTHORIZED, false, ErrorMessage.UNAUTHORIZED);
        }
      } else {
        Utils.sendResponse(res, statusCode.UNAUTHORIZED, false, ErrorMessage.UNAUTHORIZED);
      }
    } else {
      Utils.sendResponse(res, statusCode.UNAUTHORIZED, false, ErrorMessage.UNAUTHORIZED);
    }

  } catch (error) {
    console.log(error);
    Utils.sendResponse(res, statusCode.SERVER, false, ErrorMessage.INVALID_TOKEN);
  }

}