const http = require("http");
const fs = require("fs");
const url = require("url");

const PORT = 3000;

function logRequest(req) {
    const parsedUrl = url.parse(req.url, true);
    const route = parsedUrl.pathname;
    const method = req.method;
    const dateTime = new Date().toISOString();

    const log = `Route: ${route} | Method: ${method} | DateTime: ${dateTime}\n`;

    fs.appendFile("log.txt", log, (err) => {
        if (err) {
            console.log("Error writing log:", err);
        }
    });
}

const server = http.createServer((req, res) => {

    logRequest(req);

    const parsedUrl = url.parse(req.url, true);
    const route = parsedUrl.pathname;

    if (route === "/" && req.method === "GET") {
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.end("Welcome to Home Page");
    }
    else if (route === "/about" && req.method === "GET") {
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.end("Welcome to About Page");
    }
    else if (route === "/contact" && req.method === "GET") {
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.end("Welcome to Contact Page");
    }
    else {
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.end("404 Page Not Found");
    }

});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});