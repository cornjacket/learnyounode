var http = require('http');
//var qs = require('querystring');

var serverPort = process.argv[2];
http.createServer(function (request, response) {
  if(request.method === "GET") {
    console.log("Get received");
  } else if(request.method === "POST") {
    //console.log(request.url);
    if (request.url === "/") {
      var requestBody = '';
      request.on('data', function(data) {
        requestBody += data;
        if(requestBody.length > 1e7) {
          response.writeHead(413, 'Request Entity Too Large', {'Content-Type': 'text/html'});
          response.end('<!doctype html><html><head><title>413</title></head><body>413: Request Entity Too Large</body></html>');
        }
      });
      request.on('end', function() {
        var formData = qs.parse(requestBody);
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(requestBody.toUpperCase());
        response.end();
      });
    } else {
      response.writeHead(404, 'Resource Not Found', {'Content-Type': 'text/html'});
      response.end('<!doctype html><html><head><title>404</title></head><body>404: Resource Not Found</body></html>');
    }
  } else {
    response.writeHead(405, 'Method Not Supported', {'Content-Type': 'text/html'});
    return response.end('<!doctype html><html><head><title>405</title></head><body>405: Method Not Supported</body></html>');
  }
}).listen(serverPort);

// official solution
//    var http = require('http')
//    var map = require('through2-map')
//    
//    var server = http.createServer(function (req, res) {
//      if (req.method != 'POST')
//        return res.end('send me a POST\n')
//    
//      req.pipe(map(function (chunk) {
//        return chunk.toString().toUpperCase()
//      })).pipe(res)
//    })
//    
//    server.listen(Number(process.argv[2]))
