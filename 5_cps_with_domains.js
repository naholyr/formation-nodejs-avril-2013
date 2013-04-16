var http = require('http');
var domain = require('domain');

var waiting = 0;
var done = [];

function onResult () {
  var index = waiting++;
  return function (res) {
    waiting--;
    res.on('readable', function () {
      done[index] = res.read();
      if (waiting === 0) {
        onEnd();
      }
    });
  };
}

function onEnd () {
  console.log(done.map(String).join(''));
}

function onError (err) {
  console.error(String(err));
  process.exit(1);
}

domain.create().on('error', onError).run(function () {
  http.get('http://localhost:3002/2', onResult());
  http.get('http://localhost:3001/1', onResult());
  http.get('http://localhost:3003/3', onResult());
});
