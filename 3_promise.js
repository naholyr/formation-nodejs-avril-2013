var client = require('./slow-server-client');
var Q = require('q');

var get = Q.nfbind(client.get);

Q.all([
  get('http://localhost:3001/2'),
  get('http://localhost:3001/1'),
  get('http://localhost:3001/3')
]).then(client.onSuccess, client.onError);
