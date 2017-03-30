var notLogin = require('../../../lib/v2/failures/notLogin');
describe('#failures notLogin', function () {
  it('should notLogin', function (done) {
    var res = {
      onError: function (err) {
        err.should.equal('你尚未登录!');
        done();
      }
    };
    notLogin('error', null, res);
  });
});
