const express = require("express")
const router = express.Router();
const gradesController = require("../controllers/grades.controller");

router.route("/grades")
    .get(gradesController.getAll)
router.route("/grades/:gradeId")
    .get(gradesController.getOne)



module.exports = router;