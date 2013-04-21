npm
===

npm init
--------

Sur un dossier vide, quelques questions et on peut démarrer les installations.

Sur un projet déjà existant il sait récupérer l'existant : outil de tests unitaires, dépôt git, dépendances…

```
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sane defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg> --save` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
name: (repo) formation-nodejs
version: (0.0.0) 2.0.0
description: Formation Node.js 22-23 avril
entry point: (app-auth.js) server.js
test command: (mocha) ./node_modules/.bin/mocha -R list ./test
git repository: (git://github.com/naholyr/formation-nodejs-avril-2013.git)
keywords:
author: "Nicolas Chambrier" <nicolas@chambrier.fr>
license: (BSD)
About to write to /home/nchambrier/Bureau/nodejs-avril-2013/repo/package.json:

{
  "name": "formation-nodejs",
  "version": "2.0.0",
  "description": "Formation Node.js 22-23 avril",
  "main": "server.js",
  "directories": {
    "test": "test"
  },
  "dependencies": {
    "async": "~0.2.7",
    "express": "~3.2.0",
    "fibers": "~1.0.0",
    "mime": "~1.2.9",
    "chai": "~1.5.0",
    "q": "~0.9.3"
  },
  "devDependencies": {
    "mocha": "~1.9.0"
  },
  "scripts": {
    "test": "./node_modules/.bin/mocha -R list ./test",
    "start": "node server.js"
  },
  "repository": {
    "type": "git",
    "url": "git://github.com/naholyr/formation-nodejs-avril-2013.git"
  },
  "author": "\"Nicolas Chambrier\" <nicolas@chambrier.fr>",
  "license": "BSD",
  "readmeFilename": "README.md",
  "gitHead": "c0c3028f56acd1bc1ccfaa85bdbadcf52823a961"
}


Is this ok? (yes)
```

À noter :

* name: (repo) → il utilise le nom du dossier
* entry point: (app-auth.js) → il choisit le premier js à la racine
* test command: (mocha) → il a détecté qu'on dépendait de mocha
* git repository: (git://github.com/naholyr/formation-nodejs-avril-2013.git) → il a trouvé le .git et propose l'URL du remote "origin"
* Dans le `package.json` généré :
 * Les scripts de test et "start" ont été générés pour nous (pas d'export dans le module `server.js` il sait donc que c'est un module à exécuter)
 * Les dépendances présentes ont été injectées
 * Il a l'intelligence de mettre l'outil de tests unitaires en "devDependencies"

Dépendances
-----------

* "dependencies" : les modules installés dans tous les cas (`npm install`)
* "devDependencies" : les modules installés en environnement de dev (`npm install -d`)
* "bundledDependencies", "optionalDependencies", "peerDependencies"…

### Installer une nouvelle dépendance

```sh
npm install a-module --save       # ajoute "a-module" au package.json/dependencies
npm install a-module --save-dev   # ajoute "a-module" au package.json/devDependencies
```
