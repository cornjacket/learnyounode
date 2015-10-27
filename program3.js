var fs = require ('fs');
// giving an encoding to readFileSync returns a string,
// otherwise could have called text.toString() and then called split and length
var text = fs.readFileSync(process.argv[2],'utf8')
//console.log(text);

var num_lines = text.split('\n').length;
console.log(num_lines-1);