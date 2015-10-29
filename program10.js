    var net = require('net');
    var server = net.createServer(function (socket) {
      // socket handling logic
      var when = new Date();
      var when_str = when.getFullYear() + '-' + ('0'+(when.getMonth()+1)).slice(-2) + '-'
              + ('0'+when.getDate()).slice(-2) + ' ' + ('0'+when.getHours()).slice(-2) + 
          ':' + ('0'+when.getMinutes()).slice(-2);
      socket.write(when_str + "\n");
      socket.end();
    });
    server.listen( process.argv[2]);
    
// the zeroFill function looks better since it is self explanatory as to what is happening.    
    
// official solution    
//    var net = require('net')
//    
//    function zeroFill(i) {
//      return (i < 10 ? '0' : '') + i
//    }
//    
//    function now () {
//      var d = new Date()
//      return d.getFullYear() + '-'
//        + zeroFill(d.getMonth() + 1) + '-'
//        + zeroFill(d.getDate()) + ' '
//        + zeroFill(d.getHours()) + ':'
//        + zeroFill(d.getMinutes())
//    }
//    
//    var server = net.createServer(function (socket) {
//      socket.end(now() + '\n')
//    })
//    
//    server.listen(Number(process.argv[2]))