const express = require("express");
const controllers = require("../controllers/npos.controller.js");
const router = express.Router();
const upload = require('../../../index.js')
// const validation = require("../validations/admin.validation.js");
// const authValidation = require("../validations/auth.validation.js");

router.post('/page/:id', controllers.addPage);
router.get('/page/:id', controllers.getPage);
// router.post('/image-upload/:id', (req, res) => {
//     upload(req, res, (err) => {
//         if (err) {
//             res.status(400).send(err);
//         } else {
//             if (req.file == undefined) {
//                 res.status(400).send('No file selected!');
//             } else {
//                 res.send(`File uploaded to: ${req.file.path}`);
//             }
//         }
//     });
// });

router.post('/upload/:id', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.status(400).send(err);
        } else {
            if (req.file == undefined) {
                res.status(400).send('No file selected!');
            } else {
                res.send(`File uploaded to: ${req.file.path}`);
            }
        }
    });
});


module.exports = router;
