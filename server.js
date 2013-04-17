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
  app.use(express.session({secret: 'keyboard cat'}));
});
app.configure('development', function () {
  console.log('Configuring app for development environment…');
});
app.configure('production', function () {
  console.log('Configuring app for production environment…');
});

// Routing
app.get('/', function (req, res) {
  res.sendfile('index.html');
});
app.post('/api/auth/login', function (req, res) {
  if (req.session.user) return res.send('Already logged in', 403);
  if (!req.body || !req.body.username) return res.send('Field required: username', 400);
  req.session.user = req.body.username;
  res.send(204);
});
app.get('/api/auth/status', function (req, res) {
  res.json({authenticated: !!req.session.user, username: req.session.user});
});
app.post('/api/auth/logout', function (req, res) {
  req.session.user = null;
  res.send(204);
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
