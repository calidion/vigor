var urlencode = require('../../lib/template/filters/urlencode');
var category = require('../../lib/template/filters/category');
var since = require('../../lib/template/filters/since');
var iso = require('../../lib/template/filters/iso');

describe('category', function () {
  it('should return 分享', function () {
    var a = category('');
    a.should.be.equal('分享');
  });
});

describe('urlencode', function () {
  it('should get urlencode', function () {
    var a = urlencode('<span>');
    a.should.be.equal('%3Cspan%3E');
  });

  it('should get urlencode', function () {
    var a = urlencode();
    a.should.be.equal('');
  });
});

describe('since', function () {
  it('should get since', function () {
    var a = since();
    a.should.be.equal('');
  });
});

describe('iso', function () {
  it('should get since', function () {
    var a = iso(new Date());
    a.should.be.containEql('2017-');
  });

  it('should test since', function () {
    var a = iso(new Date(), 'YYYY');
    a.should.be.equal('2017');
  });
});
