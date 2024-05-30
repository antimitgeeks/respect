const { CronJob } = require('cron');
const storeService = require("../services/store.service")


const createCronJob = (cronExpression, jobFunction) => {
    const cronJob = new CronJob(cronExpression, jobFunction);
    cronJob.start();
    return cronJob;
};

// const cronExpression1 = '*/5 * * * *';
const cronExpression1 = '*/1 0 * * *';
const jobFunction1 = async () => {
    // find all active stores
    const stores = await storeService.activeStores();
    // get in store and add customer in shopify
    for (const store of stores) {
        console.log(store.id, '-------------------------stores');
        const customers = await storeService.customersByStoreId(store.name);
        // add customer in shopify
        for (const customer of customers) {
            await storeService.addCustomerInShopify(customer, store);
        }
    }
};

const createCustomer = createCronJob(cronExpression1, jobFunction1);

module.exports = { createCustomer };
