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
    const npoPages = sequelize.define("npoPages", {
        npoId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'npos',
                key: 'id',
            },
        },
        pageJson: {
            type: Sequelize.JSON,
        }
    });

    return npoPages;
};
