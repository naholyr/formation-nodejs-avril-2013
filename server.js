var http = require('http');
var path = require('path');
var fs = require('fs');

var mime = require('mime');


var server = http.createServer(serveStaticFile)

server.listen(3002)
server.on('listening', function () {
  console.log('Static server: http://localhost:' + this.address().port + '/nodejs.png');
});

var cache = {};
function serveStaticFile (req, res) {
  var filepath = path.join(__dirname, req.url);
  var cached = cache[filepath];
  if (cached) {
    res.writeHead(200, {'Content-Type': cached.type, 'Content-Length': cached.data.length});
    res.write(cached.data);
    res.end();
    return;
  }
  var type = mime.lookup(filepath);
  fs.readFile(filepath, function (err, content) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write(String(err));
    } else {
      cache[filepath] = {type: type, data: content};
      res.writeHead(200, {'Content-Type': type, 'Content-Length': content.length});
      res.write(content);
    }
    res.end();
  });
}
