var expect = require('chai').expect;

describe('array', function () {
  var array = [1, 2, 3];

  it('should have 3 items', function () {
    expect(array).to.be.an('array').and.have.length(3);
  });

  it('should not have item #3', function (done) {
    setTimeout(function () {
      expect(array[3]).to.be.undefined;
      done();
    }, 100);
  });

});
