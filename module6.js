module.exports = function (dir, ext, callback) {

  var fs = require('fs');
  var path = require('path')

  fs.readdir(dir, function (err, list) {
    if (err) {
      return callback(err)
    }
    // no error, continue doing stuff with data
    var data = list.filter(function(full_filename) {
        if (path.extname(full_filename) === '.'+ext) return full_filename
    })
    callback(err, data);
  });    
  
}