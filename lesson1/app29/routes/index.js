const express = require("express");
const router = express.Router();
const gamesController = require("../controllers/games.controllers")

router.route("/games")
    .get((req, res) => gamesController.getAll(req, res));
// .get(function(req, res) {
//     res.status(200).json("{'JSON data':'GET'}");
// })
// .post(function(req, res) {
//     res.status(200).json("{'JSON data':'POST'}");
// })

module.exports = router;