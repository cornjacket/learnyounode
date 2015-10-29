var module6 = require('./module6')

var dir = process.argv[2]
var ext = process.argv[3]

module6(dir, ext, function (err, data) {

  if (err) {
    console.log('Error in execution of program6');
  }
  else {
    data.forEach(function(entry) {
      console.log(entry);
    });
  }

}) 