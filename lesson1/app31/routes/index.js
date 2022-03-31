const express = require("express");
const router = express.Router();
const gamesController = require("../controllers/games.controllers")

router.route("/games")
    .get((req, res) => gamesController.getAll(req, res))
    .post(gamesController.addOne)

router.route("/games/:gamesIndex").get(gamesController.getGame)

module.exports = router;