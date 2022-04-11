require("dotenv").config();
require("./api/data/db");
const express = require("express");
const path = require("path");
const app = express();
const routes = require("./api/routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(function(req, res, next) {
//     console.log(req.method, req.url);
//     // res.status(200).send("asdasdf");
//     next();
// })

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept');
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    )
    next();
})

app.use("/api", routes);



app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(process.env.PORT, function() {
    console.log("Listening to port ", server.address().port);
})