var http = require('http');

var site = process.argv[2];
//console.log(site);

http.get( site, function(res) {
  // explicitly treat incoming data as utf8 (avoids issues with multi-byte chars)
  res.setEncoding('utf8');
 
  res.on('data', function(d) {
    console.log(d);
  });
 
  // do whatever we want with the response once it's done
  res.on('end', function() {
    //console.log("All done")
  });
  
}).on('error', function(err) {
  // handle errors with the request itself
  console.error('Error with the request:', err.message);
});
 
 
// official solution
// how does console.log without any parameters were. is it implied that the data received should be processed by console.log.
// what if i wanted to place it all in an array? then would i need to pass in a callback with an argument?
//    var http = require('http')
//    
//    http.get(process.argv[2], function (response) {
//      response.setEncoding('utf8')
//      response.on('data', console.log)
//      response.on('error', console.error)
//    })