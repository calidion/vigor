var messager = require('egg-messager');
var config = require('../../../../config');
var path = require('path');

module.exports = function (email, token, user, thread, cb) {
  // 模板目录
  var templatePath = path.resolve(__dirname, '../../../views/mail/thread');
  // 激活地址
  var url = 'http://' + config.site.host + '/thread/visit-accept/' + thread.id + '?email=' + email + '&token=' + token;
  var options = {
    // 发送类型
    type: 'email',
    // 接收人
    // toUser: config.name + ' <' + to + '>',
    toUser: email,
    // 邮件标题
    title: '来自[' + config.site.name + ']的用户[' + user.username + ']问题求助',
    // 邮件可配置参数
    options: {
      site: {
        name: config.site.name
      },
      user: user,
      thread: thread,
      url: url
    },
    // 模板目录
    path: templatePath,
    // 模板名
    template: 'invitation/invitation.html'
  };
  messager(config.message.adapters.email, options, cb);
};
