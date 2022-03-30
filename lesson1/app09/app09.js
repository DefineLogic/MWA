const http = require("http");
const server = http.createServer();
server.listen(8080, "localhost", function() {
    console.log("Server is running on http://localhost:8080");
});