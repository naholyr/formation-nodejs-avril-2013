var http = require('http');
var path = require('path');

var express = require('express');
var ECT = require('ect');
var rack = require('asset-rack');

var auth = require('./app-auth');


// Application express = handler
var app = express();

// Configuration
app.configure(function () {
  console.log('Configuring app…');

  var engine = new ECT({root: path.join(__dirname, '/views'), watch: true});
  app.engine('html', engine.render);
  app.set('view engine', 'html');

  app.use(function (req, res, next) {
    res.locals.title = 'Authentification';
    next();
  });

  app.use(express.logger());
  app.use(express.compress());
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express.cookieParser('my secret'));
  app.use(express.session({secret: 'keyboard cat'}));

  app.use(new rack.Rack([
    new rack.StaticAssets({
      urlPrefix: '/img',
      dirname: path.join(__dirname, 'assets', 'img')
    }),
    new rack.LessAsset({
      url: '/style.css',
      filename: path.join(__dirname, 'assets', 'css', 'style.less')
    }),
    new rack.SnocketsAsset({
      url: '/app.js',
      filename: path.join(__dirname, 'assets', 'js', 'app.js')
    })
  ]));
});
app.configure('development', function () {
  console.log('Configuring app for development environment…');
});
app.configure('production', function () {
  console.log('Configuring app for production environment…');
});

// Routing
app.get('/', function (req, res) {
  res.render('index');
});
app.use('/api/auth', auth);

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
