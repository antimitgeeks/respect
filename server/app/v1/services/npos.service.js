const { DataTypes, where } = require('sequelize');
const customerSchema = require("../models/schemas/customer.schema.js")
const path = require("path")
const fs = require("fs")
const axios = require('axios');
const { Op } = require('sequelize');

const db = require("../models/index.js");
const sequelize = db.sequelize;
const Npos = db.Npos;
const NpoPages = db.NpoPages;
const Order = db.Order;
const NpoPayments = db.NpoPayments;


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

// find image method
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

// order complete webhook 
exports.orderComplete = async (payload) => {
    const orderRecordDetails = {
        orderId: payload.id,
        amount: payload.current_subtotal_price,
        orderDate: payload.created_at,
        customerDetails: payload.customer
    }
    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://${process.env.STORE_NAME}.myshopify.com/admin/api/${process.env.STORE_VERSION}/orders/${orderRecordDetails.orderId}/metafields.json`,
        headers: {
            'X-Shopify-Access-Token': `${process.env.STORE_ACCESS_TOKEN}`
        }
    };
    try {
        const response = await axios.request(config)
        const details = response.data;
        if (details) {
            const metaField = details.metafields?.find(mf => mf.namespace === 'custom' && mf.key === 'ngo_data');
            if (metaField?.value) {
                const valuesArray = metaField.value?.split(',')?.map(value => value?.trim());
                if (valuesArray.length) {
                    const transaction = await sequelize.transaction();
                    const order = await Order.create(orderRecordDetails, { transaction });
                    // Calculate 3% of the order amount
                    const totalAmount = order.amount * 0.03;
                    // Find existing NPOs
                    const existingNpos = [];
                    for (const npoName of valuesArray) {
                        const npo = await Npos.findOne({ where: { name: npoName, isActive: true }, transaction });
                        if (npo) {
                            existingNpos.push(npo);
                        }
                    }
                    if (existingNpos.length) {
                        // Calculate the amount per NPO
                        const amountPerNpo = totalAmount / existingNpos.length;
                        for (const npo of existingNpos) {
                            await NpoPayments.create({
                                orderId: order.id,
                                npoId: npo.id,
                                amount: amountPerNpo,
                            }, { transaction });
                        }
                    }
                    await transaction.commit();
                    return true;
                }
            }
        }
        return true

    } catch (error) {
        console.log('Error in get order meta fields Details :', error);
        return false;
    }
}

// fetch npo records 
exports.records = async (npoId, details) => {
    const orderWhere = details.startDate && details.endDate ? {
        orderDate: {
            [Op.between]: [details.startDate, details.endDate]
        }
    } : {};
    const records = await NpoPayments.findAll({
        where: { npoId },
        include: [
            {
                model: Order,
                attributes: ['id', 'orderId', 'amount', 'orderDate', 'customerDetails'],
                where: orderWhere,
                order: [['orderDate', 'DESC']]
            },
            {
                model: Npos,
                attributes: ['id', 'name'],
            }
        ],
        limit: details.limit,
        offset: details.offset,
    });
    const totalAmount = await NpoPayments.sum('amount', {
        where: { npoId }
    });
    return { records, totalAmount };
}