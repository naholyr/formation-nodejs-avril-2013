var http = require('http');
var Fiber = require('fibers');
var Future = require('fibers/future');

function get (url) {
  var future = new Future;
  http.get(url, function (res) {
    res.on('readable', function () {
      future.return(res.read());
    }).on('error', function (err) {
      future.throw(err);
    });
  });
  return future;
}

Fiber(function () {
  try {
    var done = [
      get('http://localhost:3001/2'),
      get('http://localhost:3001/1'),
      get('http://localhost:3001/3')
    ];
    Future.wait(done);
    console.log(done.map(function (future) {
      return String(future.get());
    }).join(''));
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}).run();
