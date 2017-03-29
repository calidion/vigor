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
});

describe('letenc', function () {
  var key = 'key';
  var value = 'value';

  before(function (cb) {
    var LetsEnc = app.models.LetsEnc;
    LetsEnc.create({
      key: key,
      value: value
    }).then(function (created) {
      created.key.should.equal(key);
      created.value.should.equal(value);
      cb();
    });
  });

  it('should be able to handler letenc auth', function (done) {
    var req = http(app).get('/.well-known/acme-challenge/sdfosofdosdoffd');
    req.end(function (err, res) {
      console.log(err, res.text);
      res.status.should.equal(200);
      res.body.should.containDeepOrdered({
        code: 5,
        name: 'NotFound',
        message: '未找到！'
      });
      done(err);
    });
  });

  it('should be able to handler letenc auth', function (done) {
    var req = http(app).get('/.well-known/acme-challenge/' + key);
    req.end(function (err, res) {
      res.status.should.equal(200);
      res.text.should.containEql(value);
      done(err);
    });
  });
});
