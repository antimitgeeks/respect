const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: './.env' });
const db = require("./server/app/v1/models");
const routes = require("./server/app/v1/routes");
require('./server/app/v1/utils/cron.job');
const serveStatic = require("serve-static");


const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//Static file path
const STATIC_PATH =
  // eslint-disable-next-line no-undef
  process.env.NODE_ENV === "production"
    // eslint-disable-next-line no-undef
    ? `${process.cwd()}/client/dist`
    // eslint-disable-next-line no-undef
    : `${process.cwd()}/client/`;

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
  res.json({ message: "Welcome to respect admin panel." });
});


app.use(process.env.BASE_URL, routes);

// Serve static files from the specified path without generating an index.
app.use(serveStatic(STATIC_PATH, { index: false }));

// eslint-disable-next-line no-unused-vars
app.use("/*", async (req, res, next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "public/index.html")));
});


// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
