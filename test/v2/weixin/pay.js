var request = require('supertest');
var server = require('../app');
var app;

describe('v2 weixin pay', function () {
  before(function (done) {
    server(function (data) {
      app = data;
      done();
    });
  });
  it('should be able to pay weixin', function (done) {
    request(app)
      .get('/weixin/pay/qrcode/callback')
      .expect(200)
      .end(function (error, res) {
        console.log(error, res.text);
        done();
      });
  });
});
