const http = require("http");

const helloWorld = function(req, res) {
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    // res.end("Hello World");
    res.end("<Html><Body><h1>Hello World</h1></Body></Html>");
}

const server = http.createServer(helloWorld);

server.listen(8080, "localhost", function() {
    console.log("Server is running on http://localhost:8080");
});