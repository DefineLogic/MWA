const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();

app.get("/", function(req, res) {
    console.log("GET received");
    res.status(404).send("Received your get request.");
})

app.get("/json", function(req, res) {
    //console.log("Json request received");
    // res.status(404).json({ "JSON_DATA": true });
    console.log("File request received");
    res.status(200).sendFile(path.join(__dirname + "//app21.js"));
})

const server = app.listen(process.env.PORT, function() {
    // console.log("Listening to port ", server.address().port);
    console.log(process.env.LISTEN_TO_PORT_MSG, server.address().port);
});