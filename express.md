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

Routing
-------

### Route simple

```javascript
app.<methode>('/route', function (req, res) {
  res.send('Hello', 200);
});
```

Note: le routing fonctionne comme les middlewares, et il est possible de "faire suivre" à la prochaine route matchant l'URL en appelant `next()`.

### Route paramétrée

* Paramètres : `/route/:param1/:param2`
* Paramètres optionnels : `/route/:param1/:param2?`

```javascript
req.params.param1
req.params.param2
```

Il est possible d'utiliser des expressions régulières :

```javascript
app.get(/^\/route\/(.+)(?:\/(\d+))?$/, function (req, res) {
  console.log(req.params);
});
```

Sessions
--------

```javascript
app.use(express.session({secret: '…'}));

//…

req.session.X = 'Y';
```

JSON API
--------

```javascript
app.use(express.bodyParser())
```

```sh
POST /api/auth/login HTTP/1.1
Content-Type: application/json

{"username": "John"}
```

```javascript
req.body.username === "John"
```
