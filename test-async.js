var http = require('http');

function print (res) { res.pipe(process.stdout) }

http.get('http://localhost:3001/2', print);
http.get('http://localhost:3001/1', print);
http.get('http://localhost:3001/3', print);

