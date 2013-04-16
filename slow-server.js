require('http').createServer(function (req, res) {
  var time = parseInt(req.url.substring(1)) || 1;
  setTimeout(function () {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('OK[' + time + ']\n');
    res.end();
  }, time * 1000);
}).listen(3001).on('listening', function () {
  console.log('Slow request: http://localhost:' + this.address().port + '/<number>');
});
