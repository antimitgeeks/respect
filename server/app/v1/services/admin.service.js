const axios = require('axios');

const db = require("../models/index.js");
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
    // create page in shopify 
    // const pageCreated = await this.addPageInShopify({ title: details.name, body: details.name });
    // if (!pageCreated?.page) {
    //     return false
    // }
    // details.pageId = pageCreated.page.id;
    const npoDetails = await Npos.create(details);
    return npoDetails;
}

// add page in shop : shopify
exports.addPageInShopify = async (details) => {
    let data = JSON.stringify({
        "page": {
            "title": details.title,
            "template_suffix": process.env.PAGE_SUFFIX,
            "body_html": `<h2>NPO Details</h2>\n<p>${details.body}</p>`
        }
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://${process.env.STORE_NAME}.myshopify.com/admin/api/2024-04/pages.json`,
        headers: {
            'X-Shopify-Access-Token': process.env.STORE_ACCESS_TOKEN,
            'Content-Type': 'application/json'
        },
        data: data
    };

    try {
        const response = await axios.request(config)
        console.log('Shopify Page Details : ', response?.data);
        return response?.data;
    } catch (error) {
        console.log('Error In Page Create Shopify : ', error);
        return false
    }

}

// return npo`s list
exports.npoList = async (params) => {
    const nposList = await Npos.findAndCountAll({
        limit: params.limit,
        offset: params.offset,
        order: [['createdAt', 'DESC']]
    });
    return nposList;
}

// return npo details by id
exports.npoById = async (id) => {
    const npoDetails = await Npos.findOne({ where: { id } });
    return npoDetails;
}

// return npo details by shopify id
exports.npoByShopifyId = async (id) => {
    const npoDetails = await Npos.findOne({ where: { pageId: id } });
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
