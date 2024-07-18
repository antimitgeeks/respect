

module.exports = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_NAME,
  PORT: process.env.DB_PORT,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};


// module.exports = {
//   HOST: "db-mysql-nyc1-59311-do-user-16992257-0.c.db.ondigitalocean.com",
//   USER: "doadmin",
//   PASSWORD: "",
//   DB: "defaultdb",
//   PORT: 25060,
//   dialect: "mysql",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// };

// module.exports = {
//   HOST: "bktm4rjw7yvng5wterml-mysql.services.clever-cloud.com",
//   USER: "unlcdiovbnjvg0lj",
//   PASSWORD: "",
//   DB: "bktm4rjw7yvng5wterml",
//   dialect: "mysql",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// };



// host : bktm4rjw7yvng5wterml-mysql.services.clever-cloud.com
// dbname : bktm4rjw7yvng5wterml
// user : unlcdiovbnjvg0lj
// password : nzdXBdivmDdPPZ9mAhlY
// port : 3306
// connection url : mysql://unlcdiovbnjvg0lj:nzdXBdivmDdPPZ9mAhlY@bktm4rjw7yvng5wterml-mysql.services.clever-cloud.com:3306/bktm4rjw7yvng5wterml
