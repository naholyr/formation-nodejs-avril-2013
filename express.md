Express
=======

* Basé sur "connect"
 * Collection de middlewares pour serveur HTTP
* Ajoute le routing
* Ajoute quelques raccourcis (`res.json` par exemple)

Installation et utilisation
---------------------------

```sh
npm install express
```

Un serveur simple :

```javascript
// Application express = handler
var app = express();

// Routing
app.get('/*', function (req, res) {
  res.json({hello: "world"});
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
```

Configuration
-------------

```javascript
app.configure(function () {
  // Configure app here
  app.use(express.logger());
  // …
});

app.configure('environment', function () {
  // only if NODE_ENV = environ  app.use(express.cookieParser());
ment
});
```

Middlewares
-----------

### Les middlewares standard : exemple des cookies

```javascript
app.use(express.cookieParser('my secret'));
```

Cookies non signés :

```javascript
// Read
var value = req.cookies.name;
// Write
res.cookie('name', value);
```

Cookies signés :

```javascript
// Read
var value = req.signedCookies.name;
// Write
res.cookie('name', value, {signed: true});
```

### Middlewares personnalisés

```javascript
app.use(function (req, res, next) {
  // Logging, statistiques, enrichir req & res…
  doWork();
  // NE PAS OUBLIER next([err])
  next();
});
```
