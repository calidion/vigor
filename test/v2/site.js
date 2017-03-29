var http = require('supertest');
var server = require('./app');
var app;
var config = require('../../lib/config');

describe('v2 site', function () {
  before(function (done) {
    server(function (data) {
      app = data;
      done();
    });
  });
  it('should get /', function (done) {
    var req = http(app).get('/');
    req
      .expect(200)
      .end(function (err, res) {
        res.status.should.equal(200);
        res.text.should.containEql('首页');
        done(err);
      });
  });

  it('should get / with page', function (done) {
    var req = http(app).get('/').query({
      page: 10
    });
    req
      .expect(200)
      .end(function (err, res) {
        res.status.should.equal(200);
        res.text.should.containEql('首页');
        done(err);
      });
  });

  it('should / status 200', function (done) {
    var req = http(app).get('/');
    req.end(function (err, res) {
      res.status.should.equal(200);
      res.text.should.containEql(config.site.description);
      done(err);
    });
  });

  it('should be able to handler letenc autho', function (done) {
    process.env.FORIM_LETSENC_VALUE = 'sdofosdfodf';
    var req = http(app).get('/.well-known/acme-challenge/sdfosofdosdoffd');
    req.end(function (err, res) {
      res.status.should.equal(200);
      res.text.should.containEql(process.env.FORIM_LETSENC_VALUE);
      done(err);
    });
  });
});
