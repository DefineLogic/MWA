const express = require("express");
require("dotenv").config();
const path = require("path");
const app = express();
const routes = require("./routes/routes")

app.use("/api", routes)

const server = app.listen(process.env.PORT, function() {
    console.log("Listening to port: ", server.address().port);
})