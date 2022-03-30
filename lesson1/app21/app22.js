const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();

app.get("/", function(req, res) {
    console.log("GET received");
    res.status(404).send("Received your get request.");
})



// app.use("/najeeb", express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public")));

app.get("/json", function(req, res) {
    console.log("JSON request received");
    res.status(200).json({ "JSON_DATA": true });
})

const server = app.listen(process.env.PORT, function() {
    // console.log("Listening to port ", server.address().port);
    console.log(process.env.LISTEN_TO_PORT_MSG, server.address().port);
});