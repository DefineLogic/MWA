const express = require("express");
const router = express.Router();
const gamesController = require("../controllers/games.controllers")

router.route("/games")
    .get((req, res) => gamesController.getAll(req, res))
    .post(gamesController.addGame)


router.route("/games/:gameId").get(gamesController.getOne).delete(gamesController.deleteGame)

router.route("/games/:gameId/publisher").get(gamesController.getPublisher)



module.exports = router;