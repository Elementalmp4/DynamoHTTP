//DynamoHTTP V1.0
//A simple HTTP server for hosting pages and scripts
//By ElementalMP4

//Setup
const http = require("http");
const fs = require("fs");
const config = require("./config.json");
console.log("\x1b[36m%s\x1b[0m", "Starting server...");

//Stop if there is no port
if (!config.port) {
    console.log("\x1b[31m%s\x1b[0m", "You must specify a port!");
    process.exit(1);
}
//HTTP Errors
function httpError(req, res) {
    console.log("\x1b[31m%s\x1b[0m", "Error occurred upon request: " + req.url)
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end("<htm><title>DynamoHTTP Error</title><center>Invalid Request '" + req.url + "'<br></br>DynamoHTTP V1.0</center></html>")
}
//File handling errors
function fileError(req, res, file) {
    console.log("\x1b[31m%s\x1b[0m", "Could not open file '" + file + "' upon request: " + req.url)
    res.writeHead(400, { 'Content-Type': 'text/html' });
    res.end("<htm><title>DynamoHTTP Error</title><center>Server Error: File Not Found<br></br>DynamoHTTP V1.0</center></html>")
}
//Create HTTP Server
var HostServer = http.createServer(function(req, res) {
    //Log received requests
    console.log("\x1b[36m%s\x1b[0m", "Request Received: " + req.url);
    //Find request
    var request = config.requests.find(r => r.url == req.url);
    //Log error if no request exists
    if (!request) {
        httpError(req, res);
    } else {
        //Warn if no headers
        if (!request.headers) {
            console.warn('\x1b[33m%s\x1b[0m', "No headers specified for request " + req.url);
        }
        //If request requires a file, load it
        if (request.readsFile) {
            fs.readFile(request.return, function(err, data) {
                //If an error occurred, log it
                if (err) {
                    fileError(req, res, request.return);
                    return console.log(err);
                } else {
                    //Otherwise, deliver file
                    res.writeHead(200, request.headers);
                    res.write(data);
                    console.log("\x1b[32m%s\x1b[0m", "Successfully delivered request");
                    return res.end();
                }
            });
        } else {
            //If no file is required, deliver the return value
            res.writeHead(200, request.headers);
            res.write(request.return);
            console.log("\x1b[32m%s\x1b[0m", "Successfully delivered request");
            return res.end();
        }
    }
});

//Start Server
HostServer.listen(config.port);
console.log("\x1b[32m%s\x1b[0m", "Ready! Hosted on port " + config.port);