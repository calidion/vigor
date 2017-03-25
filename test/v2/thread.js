var http = require('supertest');
var config = require('../../lib/config');
var assert = require('assert');
var server = require('./app');
var app;
var shared = require('./shared');
var cookies;

describe('v2 thread', function () {
  before(function (done) {
    server(function (data) {
      app = data;
      done();
    });
  });
  it('should login in successful', function (done) {
    var req = http(app);
    req.post('/user/login')
      .send(shared.user)
      .end(function (err, res) {
        var re = new RegExp('; path=/; httponly', 'gi');
        cookies = res.headers['set-cookie']
          .map(function (r) {
            return r.replace(re, '');
          }).join("; ");
        shared.cookies = cookies;
        res.status.should.equal(302);
        res.headers.location.should.equal('/');
        done(err);
      });
  });

  it('should get the creating page', function (done) {
    var req = http(app).get('/thread/create');
    req.cookies = cookies;
    req
      .expect(200)
      .end(function (err, res) {
        res.text.should.containEql('新建话题');
        done(err);
      });
  });
  it('should unable to create when info missing', function (done) {
    var req = http(app).post('/thread/create');
    req.cookies = shared.cookies;
    req
      .send({
        category: config.site.tabs[0][0],
        content: '木耳敲回车'
      })
      .expect(403, function (err, res) {
        res.text.should.containEql('新建话题');
        done(err);
      });
  });
  it('should create a thread', function (done) {
    var req = http(app).post('/thread/create');
    req.cookies = shared.cookies;
    req
      .send({
        title: '呵呵复呵呵' + new Date(),
        category: config.site.tabs[0][0],
        content: '木耳敲回车'
      })
      .expect(302, function (err, res) {
        var id = /^\/thread\/visit\/(\w+)$/.exec(res.headers.location);
        assert(id.length);
        assert(id[1]);
        shared.thread.id = id[1];
        done(err);
      });
  });

  it('should create a thread again', function (done) {
    var req = http(app).post('/thread/create');
    req.cookies = shared.cookies;
    req
      .send({
        title: '呵呵复呵呵' + new Date(),
        category: config.site.tabs[0][0],
        content: '木耳敲回车'
      })
      .expect(302, function (err, res) {
        var id = /^\/thread\/visit\/(\w+)$/.exec(res.headers.location);
        assert(id.length);
        assert(id[1]);
        shared.thread.removed = id[1];
        done(err);
      });
  });

  it('should be able to get an edit page', function (done) {
    var req = http(app).get('/thread/edit/' + shared.thread.id);
    req.cookies = shared.cookies;
    req
      .expect(200, function (err, res) {
        res.text.should.containEql('编辑话题');
        done(err);
      });
  });

  it('should edit a thread', function (done) {
    var req = http(app).post('/thread/edit/' + shared.thread.id);
    req.cookies = shared.cookies;
    req
      .send({
        title: '修改后的Title',
        category: 'share',
        content: '修改修改的内容!'
      })
      .expect(302, function (err, res) {
        res.headers.location.should.match(/^\/thread\/visit\/\w+$/);
        done(err);
      });
  });

  it('should favorite a thread', function (done) {
    var req = http(app).post('/thread/favorite/' + shared.thread.id);
    req.cookies = shared.cookies;
    req.send({})
      .expect(200, function (err, res) {
        res.text.should.containEql('收藏成功!');
        done(err);
      });
  });

  it('should favorite a thread', function (done) {
    var req = http(app).post('/thread/favorite/' + shared.thread.id);
    req.cookies = shared.cookies;
    req.send({})
      .expect(200, function (err, res) {
        res.text.should.containEql('主题已经收藏过，不再重复收藏!');
        done(err);
      });
  });

  it('should not favorite a thread none existance', function (done) {
    var req = http(app).post('/thread/favorite/0');
    req.cookies = shared.cookies;
    req.send({})
      .expect(200, function (err, res) {
        res.text.should.containEql('主题不存在或者已经被删除!');
        done(err);
      });
  });

  it('should get /thread/favorite/:username', function (done) {
    var req = http(app).get('/thread/favorite/' + shared.user.username);
    req.expect(200, function (err, res) {
      res.text.should.containEql('收藏的话题');
      done(err);
    });
  });

  it('should unfavorite a thread', function (done) {
    var req = http(app).post('/thread/unfavorite');
    req.cookies = shared.cookies;
    req.send({
      id: shared.thread.id
    })
      .expect(200, function (err, res) {
        res.body.should.eql({
          status: 'success'
        });
        done(err);
      });
  });

  it('should get /thread/visit/:id 200', function (done) {
    var req = http(app).get('/thread/visit/' + shared.thread.id);
    req
      .expect(200, function (err, res) {
        res.text.should.containEql('修改修改的内容!');
        done(err);
      });
  });

  it('should get /thread/visit/:id 200 when login in', function (done) {
    var req = http(app).get('/thread/visit/' + shared.thread.id);
    req.cookies = shared.cookies;
    req
      .expect(200, function (err, res) {
        res.text.should.containEql('修改修改的内容!');
        res.text.should.containEql(shared.user.username);
        done(err);
      });
  });

  it('should get /thread/user/:username', function (done) {
    var req = http(app).get('/thread/user/' + shared.user.username);
    req.expect(200, function (err, res) {
      res.text.should.containEql('创建的话题');
      done(err);
    });
  });

  it('should not delete a thread', function (done) {
    var req = http(app).post('/thread/remove/' + shared.thread.id);
    req
      .expect(200, function (err, res) {
        assert(!err);
        res.text.should.containEql('你无权删除当前话题');
        done(err);
      });
  });

  it('should stick a thread', function (done) {
    process.env.FORIM_BY_PASS_POLICIES = 1;
    var req = http(app).post('/thread/stick/' + shared.thread.id);
    req.cookies = shared.cookies;
    req
      .expect(200, function (err, res) {
        res.text.should.containEql('话题置顶成功！');
        done(err);
      });
  });
  it('should unstick a thread', function (done) {
    process.env.FORIM_BY_PASS_POLICIES = 1;
    var req = http(app).post('/thread/stick/' + shared.thread.id);
    req.cookies = shared.cookies;
    req
      .expect(200, function (err, res) {
        res.text.should.containEql('话题取消置顶成功！');
        done(err);
      });
  });

  it('should hightlight a thread', function (done) {
    process.env.FORIM_BY_PASS_POLICIES = 1;
    var req = http(app).post('/thread/highlight/' + shared.thread.id);
    req.cookies = shared.cookies;
    req
      .expect(200, function (err, res) {
        res.text.should.containEql('话题加精成功！');

        done(err);
      });
  });

  it('should unhightlight a thread', function (done) {
    process.env.FORIM_BY_PASS_POLICIES = 1;
    var req = http(app).post('/thread/highlight/' + shared.thread.id);
    req.cookies = shared.cookies;
    req
      .expect(200, function (err, res) {
        res.text.should.containEql('话题取消精华成功！');
        done(err);
      });
  });
  it('should lock a thread', function (done) {
    process.env.FORIM_BY_PASS_POLICIES = 1;
    var req = http(app).post('/thread/lock/' + shared.thread.id);
    req.cookies = shared.cookies;
    req
      .expect(200, function (err, res) {
        res.text.should.containEql('话题锁定成功！');
        done(err);
      });
  });
  it('should unlock a thread', function (done) {
    process.env.FORIM_BY_PASS_POLICIES = 1;
    var req = http(app).post('/thread/lock/' + shared.thread.id);
    req.cookies = shared.cookies;
    req
      .expect(200, function (err, res) {
        res.text.should.containEql('话题取消锁定成功！');
        done(err);
      });
  });

  it('should get a thread list', function (done) {
    process.env.FORIM_BY_PASS_POLICIES = 0;

    var req = http(app).get('/thread/list');
    req
      .expect(200, function (err, res) {
        res.body.data.results.length.should.aboveOrEqual(1);
        res.body.should.containDeepOrdered(
          {
            code: 0,
            name: 'Success',
            message: '成功！'
          });
        done(err);
      });
  });

  it('should get a thread list', function (done) {
    var req = http(app).get('/thread/list').query({
      limit: 'asdf'
    });
    req
      .expect(200, function (err, res) {
        res.body.should.containDeepOrdered(
          {
            code: 2,
            name: 'InputInvalid',
            message: '输入无效!',
            data:
            {
              code: -1,
              key: 'limit',
              message: 'Not validate key limit',
              data: {
                limit: 'asdf'
              }
            }
          });
        done(err);
      });
  });

  it('should delete a thread', function (done) {
    var req = http(app).post('/thread/remove/' + shared.thread.removed);
    req.cookies = shared.cookies;
    req
      .expect(200, function (err, res) {
        res.text.should.containEql('删除成功!');
        done(err);
      });
  });
});
