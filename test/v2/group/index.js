var http = require('supertest');
var server = require('../app');
var app;
var shared = require('../shared');
var group;
var invite;
var cookies;
var user = shared.newUser();
var messages;

describe('Group', function () {
  before(function (done) {
    server(function (data) {
      app = data;
      done();
    });
  });

  it('should create a group', function (done) {
    var req = http(app).post('/group/create');
    req.cookies = shared.cookie1;
    req
      .send({
        name: 'hello',
        desc: 'desc'
      })
      .expect(200)
      .end(function (err, res) {
        res.statusCode.should.equal(200);
        res.body.code.should.equal(0);
        res.body.name.should.equal('Success');
        res.body.data.name.should.equal('hello');
        res.body.data.desc.should.equal('desc');
        shared.group = res.body.data;
        done(err);
      });
  });

  it('should create a group agagin', function (done) {
    var req = http(app).post('/group/create');
    req.cookies = shared.cookie1;
    req
      .send({
        name: 'hello',
        desc: 'desc'
      })
      .expect(200)
      .end(function (err, res) {
        res.statusCode.should.equal(200);
        res.body.code.should.equal(0);
        res.body.name.should.equal('Success');
        res.body.data.name.should.equal('hello');
        res.body.data.desc.should.equal('desc');
        group = res.body.data;
        done(err);
      });
  });

  it('should update a group', function (done) {
    var req = http(app).post('/group/update');
    req.cookies = shared.cookie1;
    req
      .send({
        id: String(group.id),
        name: 'hello1',
        desc: 'desc1'
      })
      .expect(200)
      .end(function (err, res) {
        res.statusCode.should.equal(200);
        res.body.code.should.equal(0);
        res.body.name.should.equal('Success');
        res.body.data.name.should.equal('hello1');
        res.body.data.desc.should.equal('desc1');
        done(err);
      });
  });

  it('should list my groups', function (done) {
    var req = http(app).get('/group/my');
    req.cookies = shared.cookie1;
    req
      .expect(200)
      .end(function (err, res) {
        res.statusCode.should.equal(200);
        res.body.code.should.equal(0);
        res.body.name.should.equal('Success');
        res.body.data.length.should.aboveOrEqual(2);
        done(err);
      });
  });

  it('should list all groups', function (done) {
    var req = http(app).get('/group/list');
    req.cookies = shared.cookie1;
    req
      .expect(200)
      .end(function (err, res) {
        res.statusCode.should.equal(200);
        res.body.code.should.equal(0);
        res.body.name.should.equal('Success');
        res.body.data.length.should.equal(2);
        done(err);
      });
  });

  it('should remove a group', function (done) {
    var req = http(app).post('/group/remove');
    req.cookies = shared.cookie1;
    req
      .send({
        id: String(group.id)
      })
      .expect(200)
      .end(function (err, res) {
        res.statusCode.should.equal(200);
        res.body.code.should.equal(0);
        res.body.name.should.equal('Success');
        done(err);
      });
  });

  it('should not remove a group', function (done) {
    var req = http(app).post('/group/remove');
    req.cookies = shared.cookie1;
    req
      .send({
        id: '0'
      })
      .expect(200)
      .end(function (err, res) {
        res.statusCode.should.equal(200);
        res.body.name.should.equal('GroupNotFound');
        done(err);
      });
  });

  it('should send a message to a group', function (done) {
    var req = http(app).post('/group/message/send');
    req.cookies = shared.cookie1;
    req
      .send({
        group: String(shared.group.id),
        text: 'desc'
      })
      .expect(200)
      .end(function (err, res) {
        res.statusCode.should.equal(200);
        res.body.code.should.equal(0);
        res.body.name.should.equal('Success');
        done(err);
      });
  });

  it('should send a message to a group', function (done) {
    var req = http(app).post('/group/message/send');
    req.cookies = shared.cookie1;
    req
      .send({
        group: '0',
        text: 'desc'
      })
      .expect(200)
      .end(function (err, res) {
        res.statusCode.should.equal(200);
        res.body.name.should.equal('GroupNotFound');
        done(err);
      });
  });

  it('should get message from a group', function (done) {
    var req = http(app).get('/group/message/list');
    req.cookies = shared.cookie1;
    req
      .query({
        group: String(shared.group.id)
      })
      .expect(200)
      .end(function (err, res) {
        res.statusCode.should.equal(200);
        res.body.name.should.equal('Success');
        messages = res.body.data.messages;
        res.body.data.messages.length.should.aboveOrEqual(1);
        done(err);
      });
  });

  it('should get message from a group', function (done) {
    var req = http(app).get('/group/message/list');
    req.cookies = shared.cookie1;
    req
      .query({
        group: String(shared.group.id)
      })
      .expect(200)
      .end(function (err, res) {
        res.statusCode.should.equal(200);
        res.body.name.should.equal('Success');
        res.body.data.messages.should.deepEqual(messages);
        done(err);
      });
  });

  it('should get message from a group', function (done) {
    var req = http(app).get('/group/message/list');
    req.cookies = shared.cookie1;
    req
      .query({
        group: String(shared.group.id),
        since: new Date()
      })
      .expect(200)
      .end(function (err, res) {
        res.statusCode.should.equal(200);
        res.body.name.should.equal('Success');
        res.body.data.messages.length.should.aboveOrEqual(0);
        done(err);
      });
  });

  it('should get message from a group', function (done) {
    var req = http(app).get('/group/message/list');
    req.cookies = shared.cookie1;
    req
      .query({
        group: '0'
      })
      .expect(200)
      .end(function (err, res) {
        res.statusCode.should.equal(200);
        res.body.name.should.equal('GroupNotFound');
        done(err);
      });
  });

  // 以下内容的顺序需要注意，不要随便调换

  it('should invite a user', function (done) {
    var req = http(app).post('/group/member/invite');
    req.cookies = shared.cookie1;
    req
      .send({
        group: String(shared.group.id),
        email: user.email
      })
      .expect(200)
      .end(function (err, res) {
        res.statusCode.should.equal(200);
        res.body.name.should.equal('Success');
        res.body.data.group.should.equal(shared.group.id);
        res.body.data.email.should.equal(user.email);
        res.body.data.token.should.be.String();
        invite = res.body.data;
        done(err);
      });
  });

  it('should should accept a group invitation when email not match', function (done) {
    var req = http(app).get('/group/member/ack');
    req.cookies = shared.cookie1;
    invite.status = 'accept';
    req
      .query(invite)
      .expect(200)
      .end(function (err, res) {
        res.statusCode.should.equal(200);
        res.body.name.should.equal('EmailNotMatch');
        done(err);
      });
  });

  it('should register', function (done) {
    var req = http(app);
    req.post('/user/register')
      .send({
        username: user.username,
        email: user.email,
        password: user.password,
        confirm: user.password
      })
      .expect(200, function (err, res) {
        res.text.should.containEql('欢迎加入');
        done(err);
      });
  });

  it('should activate an account', function (done) {
    app.models.User.findOne({
      username: user.username
    }).then(function (found) {
      var req = http(app);
      req.get('/user/activate').query({
        token: found.accessToken,
        username: user.username
      }).expect(200, function (err, res) {
        res.text.should.containEql('帐号激活成功，你可以现在登录论坛了!');
        done(err);
      });
    });
  });

  it('should login', function (done) {
    var req = http(app);
    req.post('/user/login')
      .send({
        username: user.username,
        password: user.password
      })
      .end(function (err, res) {
        var re = new RegExp('; path=/; httponly', 'gi');
        cookies = res.headers['set-cookie']
          .map(function (r) {
            return r.replace(re, '');
          }).join('; ');
        res.status.should.equal(302);
        res.headers.location.should.equal('/');
        done(err);
      });
  });

  it('should reject a group invitation', function (done) {
    var req = http(app).get('/group/member/ack');
    req.cookies = cookies;
    invite.status = 'reject';
    req
      .query(invite)
      .expect(200)
      .end(function (err, res) {
        res.statusCode.should.equal(200);
        res.body.name.should.equal('Success');
        res.body.data.note.should.equal('成功拒绝!');
        done(err);
      });
  });

  it('should failto invite a user when you are not in the member', function (done) {
    var req = http(app).post('/group/member/invite');
    req.cookies = cookies;
    req
      .send({
        group: String(shared.group.id),
        email: shared.user.email
      })
      .expect(200)
      .end(function (err, res) {
        res.statusCode.should.equal(200);
        res.body.name.should.equal('GroupMemberRequired');
        done(err);
      });
  });

  it('should invite a user when he is registered', function (done) {
    var req = http(app).post('/group/member/invite');
    req.cookies = shared.cookie1;
    req
      .send({
        group: String(shared.group.id),
        email: user.email
      })
      .expect(200)
      .end(function (err, res) {
        res.statusCode.should.equal(200);
        res.body.name.should.equal('Success');
        res.body.data.group.should.equal(shared.group.id);
        res.body.data.email.should.equal(user.email);
        res.body.data.token.should.be.String();
        invite = res.body.data;
        done(err);
      });
  });

  it('should accept a group invitation', function (done) {
    var req = http(app).get('/group/member/ack');
    req.cookies = cookies;
    invite.status = 'accept';
    req
      .query(invite)
      .expect(200)
      .end(function (err, res) {
        res.statusCode.should.equal(200);
        res.body.name.should.equal('Success');
        done(err);
      });
  });

  it('should accept a group invitation', function (done) {
    var req = http(app).get('/group/member/ack');
    req.cookies = cookies;
    req
      .query({
        token: 'sdfsfdsfsfd',
        email: user.email,
        group: String(shared.group.id),
        status: 'accept'
      })
      .expect(200)
      .end(function (err, res) {
        res.statusCode.should.equal(200);
        res.body.name.should.equal('InvitationNotFound');
        done(err);
      });
  });

  it('should notify the existance of a member when ack', function (done) {
    var req = http(app).get('/group/member/ack');
    req.cookies = cookies;
    app.models.GroupMemberInvite.update(
      {
        email: user.email,
        token: invite.token,
        group: String(shared.group.id)
      },
      {
        processed: false
      }
    ).then(function () {
      req
        .query({
          token: invite.token,
          email: user.email,
          group: String(shared.group.id),
          status: 'accept'
        })
        .expect(200)
        .end(function (err, res) {
          res.statusCode.should.equal(200);
          res.body.name.should.equal('GroupMemberExists');
          done(err);
        });
    });
  });

  it('should not accept a group invitation again', function (done) {
    var req = http(app).get('/group/member/ack');
    req.cookies = cookies;
    req
      .query(invite)
      .expect(200)
      .end(function (err, res) {
        res.statusCode.should.equal(200);
        res.body.name.should.equal('InvitationNotFound');
        done(err);
      });
  });

  it('should failto invite a user of the same group', function (done) {
    var req = http(app).post('/group/member/invite');
    req.cookies = shared.cookie1;
    req
      .send({
        group: String(shared.group.id),
        email: user.email
      })
      .expect(200)
      .end(function (err, res) {
        res.statusCode.should.equal(200);
        res.body.name.should.equal('GroupMemberExists');
        done(err);
      });
  });

  it('should list all members of a group', function (done) {
    var req = http(app).get('/group/member/list');
    req.cookies = shared.cookie1;
    req
      .query({
        group: String(shared.group.id)
      })
      .expect(200)
      .end(function (err, res) {
        res.statusCode.should.equal(200);
        res.body.data.members.length.should.equal(2);
        done(err);
      });
  });

  it('should list admins of a group', function (done) {
    var req = http(app).get('/group/member/list');
    req.cookies = shared.cookie1;
    req
      .query({
        group: String(shared.group.id),
        type: 'administrator'
      })
      .expect(200)
      .end(function (err, res) {
        res.statusCode.should.equal(200);
        res.body.data.members.length.should.aboveOrEqual(0);
        done(err);
      });
  });

  it('should list admins of a group', function (done) {
    var req = http(app).get('/group/member/list');
    req.cookies = shared.cookie1;
    req
      .query({
        group: String(shared.group.id),
        type: 'admin'
      })
      .expect(200)
      .end(function (err, res) {
        res.statusCode.should.equal(200);
        res.body.data.members.length.should.aboveOrEqual(0);
        done(err);
      });
  });
  it('should list the creator of a group', function (done) {
    var req = http(app).get('/group/member/list');
    req.cookies = shared.cookie1;
    req
      .query({
        group: String(shared.group.id),
        type: 'creator'
      })
      .expect(200)
      .end(function (err, res) {
        res.statusCode.should.equal(200);
        res.body.data.members.length.should.equal(1);
        done(err);
      });
  });

  it('should not list members of a group when not found', function (done) {
    var req = http(app).get('/group/member/list');
    req.cookies = shared.cookie1;
    req
      .query({
        group: '0'
      })
      .expect(200)
      .end(function (err, res) {
        res.statusCode.should.equal(200);
        res.body.name.should.equal('GroupNotFound');
        done(err);
      });
  });
});
