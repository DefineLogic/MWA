const express = require("express");
require("dotenv").config();
const path = require("path");
const app = express();


app.use("/getSum/:firstNum", function(req, res) {
    let firstNum = parseInt(req.params.firstNum);
    let secondNum = parseInt(req.query.secondNum);
    let sum = firstNum + secondNum;
    res.end(sum + '');
})

const server = app.listen(process.env.PORT, function() {
    console.log("Listening to port: ", server.address().port);
})