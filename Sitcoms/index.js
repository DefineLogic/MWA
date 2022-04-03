require("dotenv").config();
require("./api/data/db");
const routes = require("./api/routes/routes");
const express  = require("express");
const app = express();
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use(function(req,res,next){
    console.log(req.method,req.url);
    next();
})

app.use("/api",routes);

const server = app.listen(process.env.PORT,function(){
    console.log("Listening to port",server.address().port)
})