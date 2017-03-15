var messager = require('egg-messager');
var config = require('../../../../../config');
var path = require('path');

module.exports = function (to, token, name, cb) {
  // 模板目录
  var templatePath = path.resolve(__dirname, '../../../../views/mail/user/password');
  // 激活地址
  var url = 'http://' + config.site.host + '/password/reset?key=' + token + '&username=' + name;
  var options = {
    // 发送类型
    type: 'email',
    // 接收人
    // toUser: config.name + ' <' + to + '>',
    toUser: to,
    // 邮件标题
    title: '[' + config.site.name + ']重置密码',
    // 邮件可配置参数
    options: {
      site: {
        name: config.site.name
      },
      user: {
        name: name
      },
      url: url
    },
    // 模板目录
    path: templatePath,
    // 模板名
    template: 'reset.html'
  };
  messager(config.message.adapters.email, options, cb);
};
