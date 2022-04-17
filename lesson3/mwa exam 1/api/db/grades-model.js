const mongoose = require("mongoose")


const score = mongoose.Schema({
    type: { type: String, required: true },
    score: { type: Number, required: true }
})


const grades = mongoose.Schema({
    student_id: { type: Number, required: true },
    scores: [score],
    class_id: { type: Number, required: true },
})

mongoose.model(process.env.GRADES_MODEL, grades, process.env.GRADES_COLLECTION)