const { DataTypes } = require('sequelize');

module.exports = {
    Customer_Id: {
        type: DataTypes.STRING,
    },
    In_Shopify: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    Response_Data: {
        type: DataTypes.JSON,
    },
    Email: {
        type: DataTypes.STRING,
    },
    Command: {
        type: DataTypes.STRING,
    },
    First_Name: {
        type: DataTypes.STRING,
    },
    Last_Name: {
        type: DataTypes.STRING,
    },
    Phone: {
        type: DataTypes.STRING,
    },
    Phone: {
        type: DataTypes.STRING,
    },
    State: {
        type: DataTypes.STRING,
    },
    State: {
        type: DataTypes.STRING,
    },
    Email_Marketing_Status: {
        type: DataTypes.STRING,
    },
    Created_At: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    Updated_At: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    Note: {
        type: DataTypes.STRING,
    },
    Verified_Email: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    Tax_Exempt: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    Tags: {
        type: DataTypes.STRING,
    },
    Tags_Command: {
        type: DataTypes.STRING,
    },
    Address_ID: {
        type: DataTypes.STRING,
    },
    Address_Command: {
        type: DataTypes.STRING,
    },
    Address_First_Name: {
        type: DataTypes.STRING,
    },
    Address_Last_Name: {
        type: DataTypes.STRING,
    },
    Address_Phone: {
        type: DataTypes.STRING,
    },
    Address_Company: {
        type: DataTypes.STRING,
    },
    Address_Line_1: {
        type: DataTypes.STRING,
    },
    Address_Line_2: {
        type: DataTypes.STRING,
    },
    Address_City: {
        type: DataTypes.STRING,
    },
    Address_Province: {
        type: DataTypes.STRING,
    },
    Address_Province_Code: {
        type: DataTypes.STRING,
    },
    Address_Country: {
        type: DataTypes.STRING,
    },
    Address_Country_Code: {
        type: DataTypes.STRING,
    },
    Address_Zip: {
        type: DataTypes.STRING,
    },
    Address_Is_Default: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    Account_Activation_URL: {
        type: DataTypes.STRING,
    },
    Send_Account_Activation_Email: {
        type: DataTypes.STRING,
    },
    Send_Welcome_Email: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    Password: {
        type: DataTypes.STRING,
    },
};
