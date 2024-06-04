const { DataTypes, where } = require('sequelize');
const customerSchema = require("../models/schemas/customer.schema.js")

const db = require("../models/index.js");
const sequelize = db.sequelize;
const Npos = db.Npos;
const NpoPages = db.NpoPages;


// add npo page  
exports.addPage = async (pageJson, npoId) => {
    // check first npo page already exist in table
    const npoPageExist = await NpoPages.findOne({ where: { npoId } });
    if (npoPageExist) {
        await NpoPages.update({ pageJson: pageJson }, { where: { npoId } });
        return true;
    } else {
        await NpoPages.create({ npoId, pageJson });
        return true
    }
}

// return npo page details by id
exports.getPage = async (npoId) => {
    const npoPageDetails = await NpoPages.findOne({ where: { npoId } });
    return npoPageDetails;
}

// upload npo page image
exports.uploadImage = async (id, file, type) => {
    console.log(id, file, type, '--------------------------------1');
    return 'npoPageDetails';
}
