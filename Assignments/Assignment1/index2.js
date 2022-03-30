const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();

app.post("/json", function(req, res) {
    console.log("POST received");
    res.status(200).sendFile(path.join(__dirname, "json1.json"));
})


app.get("/", function(req, res) {
    console.log("GET index file received");
    res.status(200).sendFile(path.join(__dirname, "public", "index.html"));
})


app.use(express.static(path.join(__dirname, "public")));


const server = app.listen(process.env.PORT2, function() {
    // console.log("Listening to port ", server.address().port);
    console.log(process.env.LISTEN_TO_PORT_MSG, server.address().port);
});