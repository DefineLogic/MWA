const express = require("express");
const router = express.Router();
const studentController = require("../controller/student.controller");

router.route("/students").get(studentController.getAll);
router.route("/students/2").get(studentController.get);


module.exports = router;