var http = require('http');

function get (url, cb) {
  http.get(url, function (res) {
    res.on('readable', function () {
      cb(null, res.read());
    }).on('error', cb);
  });
}

function onSuccess (done) {
  console.log(done.map(String).join(''));
}

function onError (err) {
  console.error(String(err));
  process.exit(1);
}

module.exports = {
  get: get,
  onError: onError,
  onSuccess: onSuccess
}
