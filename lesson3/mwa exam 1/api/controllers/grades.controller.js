const mongoose = require("mongoose")
require("../db/grades-model");
const Grades = mongoose.model(process.env.GRADES_MODEL);

module.exports.getAll = function(req, res) {
    console.log("Get all called.")
    const response = { status: 200, message: [] }
    let offset = 0;
    let count = 20;
    let maxCount = 20;
    offset = parseInt(req.query.offset) || 0;
    count = parseInt(req.query.count) || 20;
    if (count > maxCount) {
        res.status(400).json({ error: "Count is greater than max Count." })
    }
    if (isNaN(offset) || isNaN(count)) {
        res.status(400).json({ error: "Count or Offset is not a number." })
    }
    console.log("offset count", offset, count)

    Grades.find().skip(offset).limit(count).exec(function(err, grades) {
        if (err) {
            console.log("Error:::", err)
            response.status = 500;
            response.message = err
        } else if (grades) {
            console.log("Found grades", grades)
            response.status = 200;
            response.message = grades

        } else if (!grades) {
            console.log("No grades found")
            response.status = 404;
            response.message = "No grades found."
        }
        res.status(response.status).json(response.message);
    })
}

module.exports.getOne = function(req, res) {
    console.log("GetOne api called.")
    const gradeId = req.params.gradeId;
    const response = { status: 200, message: [] }
    Grades.findById(gradeId).exec(function(err, grade) {
        if (err) {
            response.status = 500;
            response.message = "Internal server error."
        } else if (grade) {
            response.status = 200;
            response.message = grade;
        } else if (!grade) {
            response.status = 400;
            response.message = "Grade not found."
        }
        res.status(response.status).json(response.message);

    })

}