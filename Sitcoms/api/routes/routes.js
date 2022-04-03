const express = require("express");
const router = express.Router();
const sitcomsController = require("../controllers/sitcoms.controllers");
const productionController = require("../controllers/production.controllers");

router.route("/sitcoms/:sitcomId/production")
    .post(productionController.productionAdd)
    .delete(productionController.productionDelete)
    .get(productionController.productionGet)
    .put(productionController.productionUpdate)

router.route("/sitcoms")
    .get(sitcomsController.sitcomsGetAll)
    .post(sitcomsController.sitcomsAddOne)

router.route("/sitcoms/:sitcomId")
    .get(sitcomsController.sitcomsGetOne)
    .delete(sitcomsController.sitcomsDeleteOne)
    .put(sitcomsController.sitcomsUpdateOne)


module.exports = router;
