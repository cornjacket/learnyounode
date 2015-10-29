var http = require('http');

var site1 = process.argv[2];

// 1st server
http.get( site1, function(res) {
  // explicitly treat incoming data as utf8 (avoids issues with multi-byte chars)
  res.setEncoding('utf8');
 
  // incrementally capture the incoming response body
  var body = '';
  res.on('data', function(d) {
    //console.log(d);
    body += d;
  });
 
  // do whatever we want with the response once it's done
  res.on('end', function() {
    console.log(body.length);
    console.log(body);
    //console.log("All done")
  });
  
}).on('error', function(err) {
  // handle errors with the request itself
  console.error('Error with the request:', err.message);
});
 
