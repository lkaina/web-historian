var path = require('path');
var fs = require('fs');
var url = require('url');
var httpGet = require('http-get');

module.exports.datadir = path.join(__dirname, "../data/sites.txt"); // tests will need to override this.

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

var sendResponse = function(res, object, contentType, statusCode) {
  statusCode = statusCode || 200;
  headers['content-type'] = contentType;
  res.writeHead(statusCode, headers);
  object = (typeof object === 'string') ? object : JSON.stringify(object);
  res.end(object);
};

module.exports.handleRequest = function (req, res) {
  switch (req.method) {
    case 'GET':
      makeGetReq(req, res);
      break;
    case 'POST':
      makePostReq(req, res);
      break;
  }
};

var makeGetReq = function(req, res) {

  var staticFiles;
  switch (req.url) {
    case '/':
      staticFiles = path.join(__dirname, "public/index.html");
      fs.readFile(staticFiles, 'binary', function(err, site) {
        if (!err){
          sendResponse(res, site,'text/html');
        } else {
          console.log(err);
        }
      });
      break;
    case '/styles.css':
      staticFiles = path.join(__dirname, "public/styles.css");
      fs.readFile(staticFiles, 'binary', function(err, site){
        sendResponse(res, site,'text/css');
      });
      break;
    case '/lib/jquery.min.js':
      staticFiles = path.join(__dirname, "public/lib/jquery.min.js");
      fs.readFile(staticFiles, 'binary', function(err, site){
        sendResponse(res, site,'text/javascript');
      });
      break;
    default:
      sendResponse(res, {}, 'text/plain', 404);
      break;
  }
};

var makePostReq = function(req, res) {
  var data = "";
  req.on("data", function(chunk){
    data += chunk;
  });
  req.on("end", function(){
    httpGet.head(data, function(err, result) {
      if (!err){
        fs.appendFile('../data/sites.txt', data+'\n');
        sendResponse(res, 'POST request received', 'text/plain', 201);
      } else {
        sendResponse(res, 'invalid URL', 'text/plain', 201);
      }
    });
  });
};
