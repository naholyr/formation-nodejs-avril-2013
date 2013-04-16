var http = require('http');

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
    }).on('error', onError);
  };
}

function onEnd () {
  console.log(done.map(String).join(''));
}

function onError (err) {
  console.error(err);
  process.exit(1);
}

http.get('http://localhost:3001/2', onResult());
http.get('http://localhost:3001/1', onResult());
http.get('http://localhost:3001/3', onResult());
