var helper = require('./lib/html-fetcher-helpers.js');

helper.readUrls('../data/sites.txt', function(resultsArray){
  for (var i=0; i < resultsArray.length; i++){
    helper.downloadUrls(resultsArray[i]);
  }
});
