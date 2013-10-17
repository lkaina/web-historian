// var makeGetReq = function(req, res) {
//   if (routes[req.url]) {
//     routes[req.url](req, res);
//   // } else if (req.url) {
//   //   routes[req.url] = serveSite;  //?
//   //   routes[req.url](req, res);  //?
//   } else {
//     sendResponse(res, "No file found", 'text/plain', 404);
//   }
// };

// var serveIndex = function(req, res) {
//   var staticFiles = path.join(__dirname, "public/index.html");
//   fs.readFile(staticFiles, 'binary', function(err, site) {
//     if (!err){
//       sendResponse(res, site,'text/html');
//     } else {
//       console.log(err);
//     }
//   });
// };

// var serveCss = function(req, res) {
//   var staticFiles = path.join(__dirname, "public/styles.css");
//   fs.readFile(staticFiles, 'binary', function(err, site){
//     sendResponse(res, site,'text/css');
//   });
// };

// var serveJS = function(req, res) {
//   var staticFiles = path.join(__dirname, "public/lib/jquery.min.js");
//   fs.readFile(staticFiles, 'binary', function(err, site){
//     sendResponse(res, site,'text/javascript');
//   });
// };


// var serveSite = function(req, res, url) {
//   fs.readFile('../data/site/' + url, 'binary', function(err, site) {
//     if (!err){
//       sendResponse(res, site,'text/html');
//     } else {
//       console.log(err);
//     }
//   });
// };


// var routes = {};
// routes['/'] = serveIndex;
// routes['/styles.css'] = serveCss;
// routes['/lib/jquery.min.js'] = serveJS;