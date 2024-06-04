const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: '../.env' });
const db = require("./app/v1/models");
const routes = require("./app/v1/routes");
const path = require('path');
const os = require('os');
const fs = require('fs');
const multer = require('multer');
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
  res.json({ message: "Welcome to respect admin panel." });
});


// image upload code 
// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const npoId = req.params.id;
    const dir = `./app/v1/utils/images/${npoId}`;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Limit size to 1MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('image');

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

module.exports = upload;

app.use(process.env.BASE_URL, routes);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
