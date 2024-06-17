const { DataTypes, where } = require('sequelize');
const customerSchema = require("../models/schemas/customer.schema.js")
const path = require("path")
const fs = require("fs")

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

// return npo page image by id
exports.getPageImage = async (id, type) => {
    let filePath = path.join(__dirname, `../utils/images/${id}/${type}`);
    fs.readFile(filePath, function (err, content) {
        if (err) {
            console.error(err);
            return res.sendStatus(500);
        }
        res.end(content); // Serve the image
    });
    return filePath;
}

exports.findImageName = async (fullPath, imageType) => {
    const images = []
    let files =
        fs.readdirSync(fullPath);

    files.forEach(file => {
        images.push(file)
    });
    if (!images.length) {
        return false;
    }
    for (const element of images) {
        if (element.includes(imageType)) {
            return element;
        }
    }
    return false;
}