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
    const UploadedFiles = sequelize.define("uploaded_files", {
        name: {
            type: Sequelize.STRING,
        },
        storeId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'stores',
                key: 'id',
            },
        },
        status: {
            type: Sequelize.STRING,
        },
        createdBy: {
            type: Sequelize.INTEGER,
            references: {
                model: 'users',
                key: 'id',
            },
        }
    });

    return UploadedFiles;
};
