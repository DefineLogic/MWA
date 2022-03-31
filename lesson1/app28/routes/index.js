const express = require("express");
const router = express.Router();

router.route("/routes")
    .get(function(req, res) {
        res.status(200).json("{'JSON data':'GET'}");
    })
    .post(function(req, res) {
        res.status(200).json("{'JSON data':'POST'}");
    })

module.exports = router;