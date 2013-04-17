var client = require('./slow-server-client');

var waiting = 0;
var done = [];

function onResult () {
  var index = waiting++;
  return function (err, res) {
    if (err) return client.onError(err);
    done[index] = res;
    waiting--;
    if (waiting === 0) {
      client.onSuccess(done);
    }
  };
}

client.get('http://localhost:3001/2', onResult());
client.get('http://localhost:3001/1', onResult());
client.get('http://localhost:3001/3', onResult());
