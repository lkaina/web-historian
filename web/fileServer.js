var fs = require('fs');
var http = require("http");
var path = require("path");

exports.serve = function (request, response) {

  var filename;
  if (request.url === '/') {
    filename = '/index.html';
  } else {
    filename = request.url;
  }

  var ext = path.extname(filename);
  var validExtensions = {
    ".html" : "text/html",
    ".js": "application/javascript",
    ".css": "text/css",
    ".txt": "text/plain",
    ".jpg": "image/jpeg",
    ".gif": "image/gif",
    ".png": "image/png"
  };

  var isValidExt = validExtensions[ext];
  var localPath = path.join(__dirname, "/public");

  if (isValidExt) {
    localPath += filename;
    fs.exists(localPath, function(exists) {
       if (exists) {
        getFile(localPath, response, validExtensions[ext]);
       } else {
        response.writeHead(404);
        response.end();
       }
    });
  } else if (isValidExt === undefined) {
    localPath = '/Users/hackreactor/code/ryanmg/2013-09-web-historian/data/sites/' + filename;
    fs.exists(localPath, function(exists) {
       if (exists) {
        getFile(localPath, response, 'text/html');
       } else {
        response.writeHead(404);
        response.end();
       }
    });
  } else {
    console.log('Invalid file: ' + filename + " and extension: " + isValidExt);
  }
};

var getFile = function(localPath, response, mimeType) {
  fs.readFile(localPath, function(err, contents) {
    if (!err) {
      response.setHeader("Content-Length", contents.length);
      response.setHeader("Content-Type", mimeType);
      response.statusCode = 200;
      response.end(contents);
    } else {
      response.writeHead(500);
      response.end();
    }
  });
};