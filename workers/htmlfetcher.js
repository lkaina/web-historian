var helper = require('./lib/html-fetcher-helpers.js');

helper.readUrls('../data/sites.text', function(resultsArray){
  for (var i=0; i < resultsArray.length; i++){
    helper.downladUrls(resultsArray[i]);
  }
});
