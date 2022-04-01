const express = require("express");
const router = express.Router();
const gamesController = require("../controllers/games.controllers")

router.route("/games")
    .get((req, res) => gamesController.getAll(req, res))
    .post(gamesController.addGame)


router.route("/games/:gameId").get(gamesController.getGame).delete(gamesController.deleteGame)

module.exports = router;