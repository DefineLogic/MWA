const express = require("express");
const router = express.Router();
const gamesController = require("../controllers/games.controllers")
const publisherController = require("../controllers/publisher.controller")
const userController = require("../controllers/users.controllers")


router.route("/gamesGeo").get(gamesController.findByGeoocation)
router.route("/games")
    .get((req, res) => gamesController.getAll(req, res))
    .post(gamesController.addGame)

router.route("/users")
    .post(userController.addUser)


router.route("/games/:gameId")
    .get(gamesController.getOne)
    .delete(gamesController.deleteGame)
    .put(gamesController.fullUpdateOne)
    .patch(gamesController.partialUpdateOne)

router.route("/games/:gameId/publisher")
    .get(publisherController.getPublisher)
    .post(publisherController.addOne)



module.exports = router;