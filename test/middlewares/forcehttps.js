var forcehttps = require('../../lib/middlewares/forcehttps');

describe('forcehttps', function () {
  it('should force https', function (done) {
    var req = {
      headers: {
        'x-forwarded-proto': 'http',
        'host': 'abc'
      },
      path: 'def'
    };
    var res = {
      redirect: function (url) {
        url.should.be.equal('https://abcdef');
        done();
      }
    };
    forcehttps(req, res);
  });

  it('should callback', function (done) {
    var req = {
      headers: {
      }
    };
    forcehttps(req, null, function () {
      done();
    });
  });
});
