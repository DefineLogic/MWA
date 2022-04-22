const express = require("express");
const router = express.Router();
const sitcomsController = require("../controllers/sitcoms.controllers");
const productionController = require("../controllers/production.controllers");
const userController = require("../controllers/users.controllers")
const authenticationController = require("../controllers/authentication.controllers")

router.route("/sitcoms/:sitcomId/production")
    .post(authenticationController.authenticate, productionController.productionAdd)
    .delete(authenticationController.authenticate, productionController.productionDelete)
    .get(productionController.productionGet)
    .put(authenticationController.authenticate, productionController.productionUpdate)

router.route("/sitcoms")
    .get(sitcomsController.sitcomsGetAll)
    .post(authenticationController.authenticate, sitcomsController.sitcomsAddOne)

router.route("/sitcoms/:sitcomId")
    .get(sitcomsController.sitcomsGetOne)
    .delete(authenticationController.authenticate, sitcomsController.sitcomsDeleteOne)
    .put(authenticationController.authenticate, sitcomsController.sitcomsUpdateOne)

router.route("/users")
    .post(userController.addUser)
router.route("/users/login")
    .post(userController.loginUser)


module.exports = router;