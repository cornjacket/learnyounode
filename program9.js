var http = require('http');

var site0 = process.argv[2];
var site1 = process.argv[3];
var site2 = process.argv[4];

var serverCount = 0;
var body = ['','',''] // if this is not set to empty string, then i get an undefined pre-appended to each result

function get(index) {
  
  http.get( process.argv[index+2], function(res) {
    
    // explicitly treat incoming data as utf8 (avoids issues with multi-byte chars)
    res.setEncoding('utf8');
 
    res.on('data', function(d) {
      body[index] += d;
    });
 
    // do whatever we want with the response once it's done
    res.on('end', function() {
      serverCount++;
      if (serverCount == 3) {
        body.forEach(function(resp) {
          console.log(resp)
        })
      }
    });
  
  }).on('error', function(err) {
    // handle errors with the request itself
    console.error('Error with the request:', err.message);
  });
 
}

for (var i=0; i<3; i++) {
  get(i)
}

//official solution
//    var http = require('http')
//    var bl = require('bl')
//    var results = []
//    var count = 0
//    
//    function printResults () {
//      for (var i = 0; i < 3; i++)
//        console.log(results[i])
//    }
//    
//    function httpGet (index) {
//      http.get(process.argv[2 + index], function (response) {
//        response.pipe(bl(function (err, data) {
//          if (err)
//            return console.error(err)
//    
//          results[index] = data.toString()
//          count++
//    
//          if (count == 3)
//            printResults()
//        }))
//      })
//    }
//    
//    for (var i = 0; i < 3; i++)
//      httpGet(i)