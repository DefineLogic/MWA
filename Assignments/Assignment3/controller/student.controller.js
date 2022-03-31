const students = require("../student.json");

module.exports.getAll = (req, res) => {
    res.status(200).json({ students });
}

module.exports.get = (req, res) => {
    const subStudents = students.slice(0, 2);
    res.status(200).json({ subStudents });
}