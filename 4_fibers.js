var client = require('./slow-server-client');
var Fiber = require('fibers');
var Future = require('fibers/future');

var get = Future.wrap(client.get);

Fiber(function () {
  try {
    var done = [
      get('http://localhost:3001/2'),
      get('http://localhost:3001/1'),
      get('http://localhost:3001/3')
    ];
    Future.wait(done);
    client.onSuccess(done.map(function (future) {
      return future.get();
    }));
  } catch (e) {
    client.onError(e);
  }
}).run();
