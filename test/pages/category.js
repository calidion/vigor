var category = require('../../lib/template/filters/category');

describe('category', function () {
  it('should return 分享', function () {
    var a = category('');
    a.should.be.equal('分享');
  });
});
