var fs = require('fs');
var httpGet = require('http-get');

exports.readUrls = function(filePath, cb){
  filePath = filePath || '././data/sites.txt';
  var fileData = fs.read(filePath);
  var lineData = fileData.split(/[\r\n]/);
  debugger;
  return cb(lineData);
};

exports.downloadUrls = function(urls){
  
};
