var http = require('http');
var async = require('async');

function get (url) {
  return function (cb) {
    http.get(url, function (res) {
      res.on('readable', function () {
        cb(null, res.read());
      }).on('error', cb);
    });
  };
}

function onEnd (err, done) {
  if (err) return onError(err);
  console.log(done.map(String).join(''));
}

function onError (err) {
  console.error(err);
  process.exit(1);
}

async.parallel([
  get('http://localhost:3001/2'),
  get('http://localhost:3001/1'),
  get('http://localhost:3001/3')
], onEnd);
