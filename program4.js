var fs = require('fs'); 

function num_lines(callback) {
  fs.readFile(process.argv[2], 'utf8', function doneReading(err, fileContents) {
    var count = fileContents.split('\n').length - 1;
    callback(count)
  });
}

function logMyNumber(number) {
  //console.log("logMyNumber: before console.log(number)");
  console.log(number);
  //console.log("logMyNumber: after console.log(number)");
}

num_lines(logMyNumber)

/////////////////////////////////////////////////////////////////
// simple solution is as follows
//    var fs = require('fs')
//    var file = process.argv[2]
//    
//    fs.readFile(file, function (err, contents) {
//      var lines = contents.toString().split('\n').length - 1
//      console.log(lines)
//    })
////////////////////////////////////////////////////////////////