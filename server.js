var http = require('http');

var express = require('express');


// Application express = handler
var app = express();

// Configuration
app.configure(function () {
  console.log('Configuring app…');
  app.use(express.logger());
  app.use(express.compress());
  app.use(express.methodOverride());
  app.use(express.bodyParser());
});
app.configure('development', function () {
  console.log('Configuring app for development environment…');
});
app.configure('production', function () {
  console.log('Configuring app for production environment…');
});

// Routing
app.get('/counter', function (req, res) {
  var counter = parseInt(req.cookies.counter, 10) || 0;
  res.send("Value: " + counter);
});
app.get('/counter/incr', function (req, res) {
  var counter = parseInt(req.cookies.counter, 10) || 0;
  res.cookie('counter', ++counter);
  res.send("Value: " + counter);
});

// Serveur HTTP standard utilisant notre app
var server = http.createServer(app);

// Démarrage du serveur
server.listen(3003, function (err) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('Server ready http://localhost:' + this.address().port);
});
