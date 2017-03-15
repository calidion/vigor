var messager = require('egg-messager');
var config = require('../../../../../config');
var path = require('path');

module.exports = function (to, group, user, token, cb) {
  // 模板目录
  var templatePath = path.resolve(__dirname, '../../../../views/mail/group/member');
  // 激活地址
  var url = 'http://' + config.site.host + '/group/member/ack?token=' + token +
    '&email=' + to +
    '&group=' + group;

  var options = {
    // 发送类型
    type: 'email',
    // 接收人
    // toUser: config.name + ' <' + to + '>',
    toUser: to,
    // 邮件标题
    title: '[' + config.site.name + ']群组邀请',
    // 邮件可配置参数
    options: {
      sender: user,
      site: {
        name: config.site.name
      },
      user: user,
      im: config.site.client.web.host,
      url: {
        accept: url + '&status=accept',
        reject: url + '&status=reject'
      }
    },
    // 模板目录
    path: templatePath,
    // 模板名
    template: 'invitation.html'
  };
  messager(config.message.adapters.email, options, cb);
};
