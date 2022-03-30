const http = require("http");
const fs = require("fs");

let indexFileBuffer;
let statusCode;

const serveAllRequests = function(req, res) {
    switch (req.url) {
        case "/json":
            res.setHeader("Content-Type", "application/json");
            res.writeHead(200);
            res.end("{'messsage':'Hellwo World'}");
            break;
        case "/":
            res.setHeader("Content-Type", "text/html");
            res.writeHead(statusCode);
            res.end(indexFileBuffer);
            break;
    }

}

const readIndexAndServe = function(req, res) {
    res.setHeader("Content-Type", "text/html");
    res.writeHead(statusCode);
    res.end(indexFileBuffer);

}

const server = http.createServer(readIndexAndServe);

fs.readFile(__dirname + "//index.html", function(err, buffer) {
    if (err) {
        indexFileBuffer = "File Not Found";
        statusCode = 404;
    } else {
        indexFileBuffer = "File Found";
        statusCode = 200;
    }
    server.listen(8080, "localhost", function() {
        console.log("Server is running on http://localhost:8080");
    });
})