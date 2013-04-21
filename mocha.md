Tests unitaires : Mocha & Chai
==============================

Tests avec Mocha
----------------

```javascript
// test/sync.js
describe('Sync tests', function () {
  it('should be valid', function () {
    // throw if error
  })
})
```

```javascript
// test/async.js
describe('Async tests', function () {
  it('should be valid', function (done) {
    // throw if error
    // call done([err]) when over
  })
})
```

```sh
./node_modules/.bin/mocha ./test
```

* "test" est l'argument par défaut
* Ajoutez "./node_modules/.bin" à votre `$PATH` !

```sh
mocha
```

Assertions avec chai
--------------------

* Polyglote : syntaxes `expect`, `should`, ou `assert`

```javascript
var expect = require('chai').expect;

var a = [1, 2, 3], u;
expect(a).to.be.an('array').and.have.length(3);
expect(u).to.be.undefined;
```

```javascript
var should = require('chai').should(); // note "()"

var a = [1, 2, 3], u;
a.should.be.an('array').and.have.length(3);
should.not.exist(u);
```

```javascript
var assert = require('chai').assert;

var a = [1, 2, 3], u;
assert.isArray(a);
assert.equal(a.length, 3, 'expected ' + JSON.stringify(a) + ' to have a length of 3 but got ' + a.length);
assert.isUndefined(u);
```
