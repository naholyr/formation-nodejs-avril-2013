var client = require('./slow-server-client');
var http = require('http');
var domain = require('domain');

var waiting = 0;
var done = [];

function onResult () {
  var index = waiting++;
  return function (res) {
    res.on('readable', function () {
      cb(null, res.read());
      done[index] = res;
      waiting--;
      if (waiting === 0) {
        client.onSuccess(done);
      }
    });
  };
}

http.get('http://localhost:3002/2', onResult());
http.get('http://localhost:3001/1', onResult());
http.get('http://localhost:3003/3', onResult());
