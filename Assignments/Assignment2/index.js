const http = require("http");
const path = require("path");
const fs = require("fs");

require("dotenv").config();

http.createServer(function(req, res) {

    var url = req.url;

    if (url === '/') {
        fs.readFile(path.join(__dirname, "public", "index.html"), "UTF-8", function(err, html) {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(html);
        });
    } else if (url === '/json' && req.method === "POST") {
        fs.readFile(path.join(__dirname, "json1.json"), "UTF-8", function(err, json) {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(json);
        });
    } else if (req.url.match("\.html$")) {
        // var htmlPath = path.join(__dirname, 'public', req.url);
        // var fileStream = fs.createReadStream(htmlPath, "UTF-8");
        // res.writeHead(200, { "Content-Type": "text/html" });
        // fileStream.pipe(res);

        fs.readFile(path.join(__dirname, "public", req.url), "UTF-8", function(err, html) {
            if (err) {
                console.log("Error::::::", err)
                res.writeHead(404, { "Content-Type": "text/html" });
                res.end("No Page Found");
            } else {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(html);
            }
        });

    } else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("No Page Found");
    }
}).listen(process.env.PORT, function() {

    // The server object listens on port 3000
    console.log(process.env.LISTEN_TO_PORT_MSG, process.env.PORT);
});