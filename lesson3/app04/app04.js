require("dotenv").config();
require("./api/data/db");
require("./api/data/dbconnection").open();
const express = require("express");
const path = require("path");
const app = express();
const routes = require("./api/routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    console.log(req.method, req.url);
    // res.status(200).send("asdasdf");
    next();
})

app.use("/api", routes);

app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(process.env.PORT, function() {
    console.log("Listening to port ", server.address().port);
})