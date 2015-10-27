var fs   = require('fs')
var path = require('path')
var dir  = process.argv[2]
var ext  = process.argv[3]

fs.readdir(dir, function (err, list) {
  list.forEach(function(filename) {
    if (path.extname(filename) === '.' + ext) console.log(filename)
  })
})

/////////////////////////////////////////////////////////////////
// simple solution is as follows
/*    var fs = require('fs')
    var dir = process.argv[2]
    var ext = process.argv[3]
    
    //console.log('extension follows')
    //console.log(ext)
    fs.readdir(dir, function (err, list) {
      for(var count = 0; count < list.length; count++){
        var filename_ext = list[count].split('.')
        //console.log(filename_ext[0]);
        //console.log(filename_ext[1]);
        if (filename_ext[1] === ext) {
          console.log(list[count]);
        }
      }
    })
*/
////////////////////////////////////////////////////////////////
// Solution 
//    var fs = require('fs')
//    var path = require('path')
    
//    fs.readdir(process.argv[2], function (err, list) {
//      list.forEach(function (file) {
//        if (path.extname(file) === '.' + process.argv[3])
//          console.log(file)
//      })
//    })