var http = require('supertest');
var github = require('../../../lib/v2/handlers/oauth/github/');
var config = require('../../../lib/config');
var assert = require('assert');
var server = require('../app');
var app;
/* eslint camelcase: ["error", {properties: "never"}] */

describe('#oauth', function () {
  before(function (done) {
    server(function (data) {
      app = data;
      done();
    });
  });
  it('should alert no github oauth', function (done) {
    config.oauth.adapters.github.clientID = '';
    var req = http(app);
    req.get('/oauth/github/login')
      .expect(200)
      .end(function (err, res) {
        assert(!err);
        assert.equal(res.text, 'call the admin to set github oauth.');
        done();
      });
  });
  it('should 302 when get /oauth/github/login', function (done) {
    var _clientID = config.oauth.adapters.github.clientID;
    config.oauth.adapters.github.clientID = 'aldskfjo2i34j2o3';
    var req = http(app);
    req.get('/oauth/github/login')
      .expect(302, function (err, res) {
        if (err) {
          return done(err);
        }
        res.headers.should.have.property('location')
          .with.startWith('https://github.com/login/oauth/authorize?');
        config.oauth.adapters.github.clientID = _clientID;
        done();
      });
  });

  it('should redirect to github oauth page', function (done) {
    var _clientID = config.oauth.adapters.github.clientID;
    config.oauth.adapters.github.clientID = 'clientID chenged';
    var req = http(app);
    req.get('/oauth/github/login')
      .expect(302, function (err, res) {
        if (err) {
          return done(err);
        }
        res.headers.location.should.containEql('https://github.com/login/oauth/authorize?');
        config.oauth.adapters.github.clientID = _clientID;
        done();
      });
  });

  describe('get /oauth/github/login/callback', function () {
    before(function () {
      app.get('/oauth/github/login/test_callback',
        function (req, res, next) {
          req.user = {
            id: 'notexists',
            username: 'sdfsdf',
            accessToken: 'asdfsff',
            emails: [
              {
                value: 'notexists@gmail.com'
              }
            ],
            _json: {
              avatar_url: 'http://avatar_url'
            }
          };
          next();
        },
        github.callback.routers.get);
    });
    it('should create user when the github id not in database', function (done) {
      var req = http(app);
      req.get('/oauth/github/login/test_callback?code=123456')
        .expect(302, function (err, res) {
          if (err) {
            return done(err);
          }
          res.headers.should.have.property('location')
            .with.endWith('/');
          done();
        });
    });
  });

  describe('get /oauth/github/create', function () {
    it('should 200', function (done) {
      var req = http(app);
      req
        .get('/oauth/github/create')
        .expect(200, function (err, res) {
          if (err) {
            return done(err);
          }
          res.text.should.containEql('/oauth/github/create');
          done();
        });
    });
  });
});
