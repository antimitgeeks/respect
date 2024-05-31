const axios = require('axios');
const fs = require('fs');
const { DataTypes, where } = require('sequelize');
const customerSchema = require("../models/schemas/customer.schema.js")
const csv = require('csv-parser');
const stream = require('stream');

const db = require("../models/index.js");
const Stores = db.stores;
const uploadedFiles = db.uploadedFiles;
const sequelize = db.sequelize;
const Npos = db.Npos;


// get npo details by name  
exports.npoByName = async (name) => {
    const npoDetails = await Npos.findOne({ where: { name } });
    return npoDetails;
}

// get npo details by email  
exports.npoByEmail = async (email) => {
    const npoDetails = await Npos.findOne({ where: { email } });
    return npoDetails;
}

// add new store 
exports.addNpo = async (details) => {
    const npoDetails = await Npos.create(details);
    return npoDetails;
}

// return npo`s list
exports.npoList = async (params) => {
    const nposList = await Npos.findAndCountAll({
        limit: params.limit,
        offset: params.offset
    });
    return nposList;
}

// return npo details by id
exports.npoById = async (id) => {
    const npoDetails = await Npos.findOne({ where: { id } });
    return npoDetails;
}

// update npo details by id
exports.npoUpdate = async (details, id) => {
    await Npos.update(details, { where: { id } });
    return true;
}

// delete npo details by id
exports.npoDelete = async (id) => {
    await Npos.destroy({ where: { id } });
    return true;
}
