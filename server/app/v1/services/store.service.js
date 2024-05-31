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


// get store details by name  
exports.storeByName = async (name) => {
    const storeDetails = await Stores.findOne({ where: { name } });
    return storeDetails;
}

// add new store 
exports.addStore = async (details) => {
    const storeDetails = await Stores.create(details);
    // create default tables
    const CustomerTable = sequelize.define(`${details.name}_customers`, customerSchema, {});
    await CustomerTable.sync();
    return storeDetails;
}

// return store list
exports.storeList = async (params) => {
    const storeList = await Stores.findAndCountAll({
        limit: params.limit,
        offset: params.offset
    });
    return storeList;
}

// return store details by id
exports.storeById = async (id) => {
    const storeDetail = await Stores.findOne({ where: { id } });
    return storeDetail;
}

// update store details by id
exports.storeUpdate = async (details, id) => {
    await Stores.update(details, { where: { id } });
    return true;
}

// delete store details by id
exports.storeDelete = async (id) => {
    await Stores.destroy({ where: { id } });
    return true;
}

// check given store is valid or not by graphql api 
exports.validStore = async (details) => {
    const data = JSON.stringify({
        query: `query { 
            shop { 
                name 
                currencyCode 
                checkoutApiSupported 
                taxesIncluded 
                resourceLimits 
                { 
                    maxProductVariants 
                }
                 } 
            }`,
        variables: {}
    });

    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://${details.name}/admin/api/2024-04/graphql.json`,
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': details.accessToken
        },
        data: data
    };

    try {
        const response = await axios.request(config);
        const storeDetails = JSON.stringify(response?.data);
        console.log('************************StoreDetails*************************', storeDetails);
        return true;
    } catch (err) {
        console.log('Error In Shop Details By Name Graphql', err.response?.data);
        return false;
    }
}

// delete store row by name 
exports.deleteByName = async (name) => {
    await Stores.destroy({ where: { name } });
    return true;
}


exports.getCustomerTableModel = (storeName) => {
    return sequelize.define(`${storeName}_customers`, customerSchema, {});
};

// upload details in database  
exports.uploadedFiles = async (name, csvFile, type, userId, storeId) => {
    try {
        // added file in uploaded file table 
        const fileDetails = {
            name: csvFile.originalname,
            storeId: storeId,
            status: "Pending",
            createdBy: userId
        }
        const uploadedFilesDetails = await uploadedFiles.create(fileDetails);
        if (type === 'Customer') {
            const CustomerTable = await this.getCustomerTableModel(name);
            await CustomerTable.sync();

            const results = [];
            const bufferStream = new stream.PassThrough();
            bufferStream.end(csvFile.buffer);

            bufferStream.pipe(csv()).on('data', (row) => {
                // console.log('------------------------------------------------------------row');
                results.push(row);
            }).
                on('end', async () => {
                    console.log('-------------------------------------------------results', results, '-------result');
                    for (const row of results) {
                        row.Created_At = new Date();
                        row.Updated_At = new Date();
                        row.Verified_Email = 1;
                        row.Tax_Exempt = 1;
                        row.Address_Is_Default = 1;
                        row.Send_Welcome_Email = 1;
                        await CustomerTable.create(row);
                    }
                    console.log('CSV data inserted successfully');
                }).on('error', (error) => {
                    console.log("Error In Customer Upload In DB: ", error);
                    return { status: false };
                });
            await uploadedFiles.update({ status: 'Complete' }, { where: { id: uploadedFilesDetails.id } });
            return { status: true };
        } else {
            return { status: false, message: 'Wrong Uploaded Type.' };
        }
    }
    catch (error) {
        console.log("Error In Customer Upload In DB : ", error);
        return { status: false }
    }
}

// find is active stores
exports.activeStores = async () => {
    const stores = await Stores.findAll({ where: { isActive: true } });
    return stores;
}

// get customers by store id
exports.customersByStoreId = async (name) => {
    // initialize current store table
    const CustomerTable = await this.getCustomerTableModel(name);
    await CustomerTable.sync();
    // get all customers which is not created in shopify at

    const customers = await CustomerTable.findAll({ where: { In_Shopify: false } });
    return customers;
}

exports.addCustomerInShopify = async (customerDetails, storeDetails) => {
    // initialize current store table
    const CustomerTable = await this.getCustomerTableModel(storeDetails.name);
    await CustomerTable.sync();
    // mutation for create customer
    let data = JSON.stringify({
        "customer": {
            "first_name": customerDetails.First_Name,
            "last_name": customerDetails.Last_Name,
            "email": customerDetails.Email,
            "send_email_welcome": customerDetails.Send_Welcome_Email
        }
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://dev-themes-testing.myshopify.com/admin/api/2024-04/customers.json`,
        data: data
    };

    try {
        const response = await axios.request(config);
        const customerData = JSON.stringify(response?.data);
        // check if no error when add customer on shopify
        const createdError = customerData?.data?.customerCreate?.userErrors;
        if (!createdError?.length) {
            // update customer 
            await CustomerTable.update({ In_Shopify: true }, { where: { id: customerDetails.id } })
        } else {
            await CustomerTable.update({ Response_Data: createdError }, { where: { id: customerDetails.id } })
        }
        console.log('************************Create Customer In Shopify*************************');
        return true;
    } catch (err) {
        await CustomerTable.update({ Response_Data: err.response?.data?.errors }, { where: { id: customerDetails.id } });
        console.log('Error In create shopify customer', err.response?.data);
        return false;
    }

}

// return store files by id
exports.filesByShoreId = async (storeId, params) => {
    const fileList = await uploadedFiles.findAndCountAll(
        { where: { storeId } },
        {
            limit: params.limit,
            offset: params.offset
        }
    );
    return fileList;
}