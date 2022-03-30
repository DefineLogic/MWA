const http = require("http");

const helloWorld = function(req, res) {
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    res.end("{'message':'Hello World!'}");
}

const server = http.createServer(helloWorld);

server.listen(8080, "localhost", function() {
    console.log("Server is running on http://localhost:8080");
});