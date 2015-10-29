var http = require('http');
var qs = require('querystring');
var url = require('url');
// this code is based off of something from SO. following form isn't being used but i'm keeping around for later use
var formOutput = '<html><body>'
  + '<h1>XYZ Repository Commit Monitor</h1>'
  + '<form method="post" action="inbound" enctype="application/x-www-form-urlencoded"><fieldset>'
  + '<div><label for="UserName">User Name:</label><input type="text" id="UserName" name="UserName" /></div>'
  + '<div><label for="Repository">Repository:</label><input type="text" id="Repository" name="Repository" /></div>'
  + '<div><label for="Branch">Branch:</label><input type="text" id="Branch" name="Branch" value="master" /></div>'
  + '<div><input id="ListCommits" type="submit" value="List Commits" /></div></fieldset></form></body></html>';
var serverPort = process.argv[2];
http.createServer(function (request, response) {
  var url_obj = url.parse(request.url, true);
  var output_string
  if(request.method === "GET") {
    if (url_obj.pathname === "/api/parsetime") {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      var iso = url_obj.query.iso;
      var d = new Date(iso);
      var hours = d.getHours();
      var mins = d.getMinutes();
      var secs = d.getSeconds();
      output_string = ' { "hour":' + hours + ', "minute": ' + mins + ', "second": ' + secs + ' }';
      response.write(output_string);
      response.end();
    } else if (url_obj.pathname === "/api/unixtime"){
      var iso = url_obj.query.iso;
      var unixtime = Date.parse(iso);
      output_string = ' { "unixtime": ' + unixtime + ' }';
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.write(output_string);
      response.end();
    } else {
      console.log("DAVE 3");
      console.log(request.url);
      console.log("DAVE 3.1");
      //var url_obj = url.parse(request.url, true);
      console.log(url_obj);
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.end(formOutput);
    }
  } else if(request.method === "POST") {
    if (request.url === "/inbound") {
      console.log("DAVE 4");
      var requestBody = '';
      request.on('data', function(data) {
        requestBody += data;
        if(requestBody.length > 1e7) {
          console.log("DAVE 5");
          response.writeHead(413, 'Request Entity Too Large', {'Content-Type': 'text/html'});
          response.end('<!doctype html><html><head><title>413</title></head><body>413: Request Entity Too Large</body></html>');
        }
      });
      request.on('end', function() {
        console.log("DAVE 6");
        var formData = qs.parse(requestBody);
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write('<!doctype html><html><head><title>response</title></head><body>');
        response.write('Thanks for the data!<br />User Name: '+formData.UserName);
        response.write('<br />Repository Name: '+formData.Repository);
        response.write('<br />Branch: '+formData.Branch);
        response.end('</body></html>');
      });
    } else {
      console.log("DAVE 7");
      response.writeHead(404, 'Resource Not Found', {'Content-Type': 'text/html'});
      response.end('<!doctype html><html><head><title>404</title></head><body>404: Resource Not Found</body></html>');
    }
  } else {
    console.log("DAVE 8");
    response.writeHead(405, 'Method Not Supported', {'Content-Type': 'text/html'});
    return response.end('<!doctype html><html><head><title>405</title></head><body>405: Method Not Supported</body></html>');
  }
}).listen(serverPort);
//console.log('Server running at localhost:'+serverPort);

// Official solution
//    var http = require('http')
//    var url = require('url')
//    
//    function parsetime (time) {
//      return {
//        hour: time.getHours(),
//        minute: time.getMinutes(),
//        second: time.getSeconds()
//      }
//    }
//    
//    function unixtime (time) {
//      return { unixtime : time.getTime() }
//    }
//    
//    var server = http.createServer(function (req, res) {
//      var parsedUrl = url.parse(req.url, true)
//      var time = new Date(parsedUrl.query.iso)
//      var result
//    
//      if (/^\/api\/parsetime/.test(req.url))
//        result = parsetime(time)
//      else if (/^\/api\/unixtime/.test(req.url))
//        result = unixtime(time)
//    
//      if (result) {
//        res.writeHead(200, { 'Content-Type': 'application/json' })
//        res.end(JSON.stringify(result))
//      } else {
//        res.writeHead(404)
//        res.end()
//      }
//    })
//    server.listen(Number(process.argv[2]))
