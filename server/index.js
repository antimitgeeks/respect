const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: '../.env' });
const db = require("./app/v1/models");
const routes = require("./app/v1/routes");
const path = require('path');
const os = require('os');
const fs = require('fs');
require('./app/v1/utils/cron.job');

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// const uploadDir = path.join(os.tmpdir(), 'uploads');

// // Ensure the directory exists
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

const data = () => {
  console.log('test');
}

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to itgeeks admin panel." });
});


app.use(process.env.BASE_URL, routes);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
