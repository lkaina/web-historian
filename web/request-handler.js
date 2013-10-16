var path = require('path');
var url = require('url');
var fs = require('fs');
var htmlFetch = require('../workers/htmlfetcher.js');


var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10,
  "Content-Type": "application/json"
};

var submittedUrls = {};
var fileListName = './data/sites.txt/';
module.exports.datadir = path.join(__dirname, "../data/sites.txt"); // tests will need to override this.

module.exports.handleRequest = function (req, res) {
  var parsedUrl = url.parse(req.url);
  var pathName = parsedUrl.pathname;
  console.log(req.method);
  console.log(exports.datadir);

  switch (req.method) {
    case 'GET':
      res.writeHead(200, headers);
      res.end();
      break;
    case 'POST':
      debugger;
      var body = '';
      req.on('data', function(data){
        body+=data;
      });
      req.on('end', function(){
        res.writeHead(302, headers);
        var urls = JSON.parse(body);
        //update site list
        fs.appendFile(fileListName, '\n'+urls, function(err){
          if(err){
            console.log('Error Writing File');
          } else{
            console.log('Updated File Successfully');
          }
        });
        //
        res.end(JSON.stringify('ok'));
      });
      break;
    default:
      res.writeHead(404, headers);
      res.end();
  }

};
