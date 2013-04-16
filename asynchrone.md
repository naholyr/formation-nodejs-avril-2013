API Asynchrone
==============

`slow-server.js` démarre un serveur répondant en X secondes aux requêtes sur http://localhost:3001/X

Exemple synchrone mono-tâche
----------------------------

```sh
curl http://localhost:3001/2 && \
curl http://localhost:3001/1 && \
curl http://localhost:3001/3
```

Total : 6 secondes, 1 process à la fois

Exemple synchrone multi-tâche
-----------------------------

```sh
curl http://localhost:3001/2 & \
curl http://localhost:3001/1 & \
curl http://localhost:3001/3 && \
wait
```

Total : 3 secondes, jusqu'à 3 process à la fois

Exemple asynchrone mono-tâche
-----------------------------

```sh
var http = require('http');

function print (res) { res.pipe(process.stdout) }

http.get('http://localhost:3001/2', print);
http.get('http://localhost:3001/1', print);
http.get('http://localhost:3001/3', print);
```

Total : 3 secondes, 1 seul process

Comparaison des API implémentées
================================

* "Vanilla"
* async
* q (promises)
* fibers
* domains
