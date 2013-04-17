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
  app.use(express.cookieParser('my secret'));
  app.use(function expressCounter (req, res, next) {
    req.counter = parseInt(req.signedCookies.counter, 10) || 0;
    res.incrCounter = function (count) {
      count = parseInt(count, 10) || 1;
      req.counter += count;
      res.cookie('counter', String(req.counter), {signed: true});
    };
    next();
  });
});
app.configure('development', function () {
  console.log('Configuring app for development environment…');
});
app.configure('production', function () {
  console.log('Configuring app for production environment…');
});

// Routing
app.get('/counter', function (req, res) {
  res.send("Value: " + req.counter);
});
app.get('/counter/incr/:count?', function (req, res) {
  res.incrCounter(req.params.count);
  res.send("Value: " + req.counter);
});

app.get(/^\/route\/(.+?)(?:\/(\d*))?$/, function (req, res) {
  res.json(req.params);
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
