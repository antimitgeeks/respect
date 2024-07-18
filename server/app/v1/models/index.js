const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");

// const sequelize = new Sequelize({
//   host: dbConfig.HOST,
//   username: dbConfig.USER,
//   password: dbConfig.PASSWORD,
//   database: dbConfig.DB,
//   dialect: "mysql",
//   dialectModule: require("mysql2"),
//   benchmark: true
// })

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: 'mysql',
    port: dbConfig.PORT,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
db.users = require("./users.model.js")(sequelize, Sequelize);
// db.stores = require("./stores.model.js")(sequelize, Sequelize);
// db.uploadedFiles = require("./uploaded.files.model.js")(sequelize, Sequelize);
db.Npos = require("./npos.model.js")(sequelize, Sequelize);
db.NpoPages = require("./npoPages.model.js")(sequelize, Sequelize);
db.Order = require("./order.model.js")(sequelize, Sequelize);
db.NpoPayments = require("./npoPayments.model.js")(sequelize, Sequelize);

db.Order.hasMany(db.NpoPayments, { foreignKey: 'orderId' });
db.NpoPayments.belongsTo(db.Order, { foreignKey: 'orderId' });

db.Npos.hasMany(db.NpoPayments, { foreignKey: 'npoId' });
db.NpoPayments.belongsTo(db.Npos, { foreignKey: 'npoId' });


module.exports = db;
