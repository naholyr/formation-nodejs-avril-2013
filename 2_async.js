var client = require('./slow-server-client');
var async = require('async');

function get (url) {
  return client.get.bind(null, url);
}

async.parallel([
  get('http://localhost:3001/2'),
  get('http://localhost:3001/1'),
  get('http://localhost:3001/3')
], function (err, done) {
  if (err) return client.onError(err);
  client.onSuccess(done);
});
