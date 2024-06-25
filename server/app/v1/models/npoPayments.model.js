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
    const NpoPayments = sequelize.define("npoPayments", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        orderId: {
            type: Sequelize.INTEGER,
            // references: {
            //     model: 'order',
            //     key: 'id',
            // },
        }, 
        npoId: {
            type: Sequelize.INTEGER,
            // references: {
            //     model: 'npos',
            //     key: 'id',
            // },
        },
        amount: {
            type: Sequelize.FLOAT,
        },
    });

    return NpoPayments;
};
