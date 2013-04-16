var http = require('http');
var Q = require('q');

function get (url) {
  var deferred = Q.defer();
  http.get(url, function (res) {
    res.on('readable', function () {
      deferred.resolve(res.read());
    }).on('error', function (err) {
      deferred.reject(err);
    });
  });
  return deferred.promise;
}

function onEnd (done) {
  console.log(done.map(String).join(''));
}

function onError (err) {
  console.error(err);
  process.exit(1);
}

Q.all([
  get('http://localhost:3001/2'),
  get('http://localhost:3001/1'),
  get('http://localhost:3001/3')
]).then(onEnd, onError);
