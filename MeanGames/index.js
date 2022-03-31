require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const routes = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    console.log(req.method, req.url);
    // res.status(200).send("asdasdf");
    next();
})

app.use("/api", routes);

app.get("/json", function(req, res) {
    res.status(200).json("{'JSON data':true}")
})

app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(process.env.PORT, function() {
    console.log("Listening to port ", server.address().port);
})