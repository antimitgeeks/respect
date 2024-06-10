/**
 * @typedef {import('sequelize').Sequelize} Sequelize
 * @typedef {import('sequelize').DataTypes} DataTypes
 * @typedef {import('sequelize').Model} Model
 */

/**
 * @param {Sequelize} sequelize
 * @param {typeof import('sequelize').DataTypes} DataTypes
 * @returns {Model}
 */

const bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {
    /**
     * @type {Model}
     */
    const Npos = sequelize.define("npos", {
        name: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING,
        },
        // address: {
        //     type: Sequelize.STRING,
        // },
        number: {
            type: Sequelize.STRING,
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        role: {
            type: Sequelize.STRING,
            defaultValue: 'npo'
        },
        pageId: {
            type: Sequelize.STRING
        }
    });

    return Npos;
};
