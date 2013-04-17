var http = require('http');
var path = require('path');
var fs = require('fs');

var mime = require('mime');


var server = http.createServer(serveStaticFile)

server.listen(3002)
server.on('listening', function () {
  console.log('Static server: http://localhost:' + this.address().port + '/nodejs.png');
});

function serveStaticFile (req, res) {
  var filepath = path.join(__dirname, req.url);
  var type = mime.lookup(filepath);
  fs.readFile(filepath, function (err, content) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write(String(err));
    } else {
      res.writeHead(200, {'Content-Type': type, 'Content-Length': content.length});
      res.write(content);
    }
    res.end();
  });
}
