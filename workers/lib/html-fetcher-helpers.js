var fs = require('fs');
var httpGet = require('http-get');

exports.readUrls = function(filePath, cb){
  filePath = filePath || '/Users/hackreactor/code/ryanmg/2013-09-web-historian/data/sites.txt';
  //check for valid url
  fs.readFile(filePath, 'binary', function(err, data) {
    var fileData = data;
    var lineData = fileData.split(/[\r\n]/);
    return cb(lineData);
  });
};

exports.downloadUrls = function(url){
//  fs.appendFile('test.txt', urls);
  var newFile = '/Users/hackreactor/code/ryanmg/2013-09-web-historian/data/sites/' + url;
  httpGet.get(url, newFile, function(error, result){
    if(error){
      console.log('Error on: ', url, ' - error is ', error);
    } else{
      console.log('Success: ', result.file);
      //fs.writeFile(urls);
    }
  });
};
