var path = require('path');
var fs = require('fs');
var url = require('url');
var httpGet = require('http-get');
var fileServer = require('./fileServer.js');

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
      fileServer.serve(req,res);
      break;
    case 'POST':
      makePostReq(req, res);
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
        if (!foundSites[data]) {
          fs.appendFile('/Users/hackreactor/code/ryanmg/2013-09-web-historian/data/sites.txt', data+'\n');
          sendResponse(res, 'POST request received', 'text/plain', 201);
          foundSites[data] = true;
        }
        sendResponse(res, 'already logged', 'text/plain', 201);
      } else {
        sendResponse(res, 'invalid URL', 'text/plain', 404);
      }
    });
  });
};

var foundSites = {};
fs.readFile('/Users/hackreactor/code/ryanmg/2013-09-web-historian/data/sites.txt', 'binary', function(err, data) {
  if (err) {
    fs.writeFile('/Users/hackreactor/code/ryanmg/2013-09-web-historian/data/sites.txt', "");
  } else {
    var fileData = data;
    var lineData = fileData.split(/[\r\n]/);
    for (var i = 0; i < lineData.length; i++) {
      foundSites[lineData[i]] = true;
    }
  }

});
