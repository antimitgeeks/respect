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
    const Stores = sequelize.define("stores", {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        accessToken: {
            type: Sequelize.STRING,
            allowNull: false
        },
        apiKey: {
            type: Sequelize.STRING,
            allowNull: false
        },
        apiPassword: {
            type: Sequelize.STRING,
            allowNull: false
        },
        createdBy: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    });

    return Stores;
};
