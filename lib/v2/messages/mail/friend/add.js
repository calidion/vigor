var messager = require('egg-messager');
var config = require('../../../../config');
var path = require('path');

module.exports = function (to, sender, token, cb) {
  // 模板目录
  var templatePath = path.resolve(__dirname, '../../../views/mail/friend');
  // 激活地址
  var url = 'http://' + config.site.host + '/friend/ack?email=' + to + '&token=' + token;
  var options = {
    // 发送类型
    type: 'email',
    // 接收人
    // toUser: config.name + ' <' + to + '>',
    toUser: to,
    // 邮件标题
    title: '[' + config.site.name + ']好友添加通知',
    // 邮件可配置参数
    options: {
      site: {
        name: config.site.name
      },
      sender: sender,
      url: {
        accept: url + '&status=accept',
        reject: url + '&status=reject'
      },
      im: 'xiv.im'
    },
    // 模板目录
    path: templatePath,
    // 模板名
    template: 'add.html'
  };
  messager(config.message.adapters.email, options, cb);
};
