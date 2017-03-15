var messager = require('egg-messager');
var config = require('../../../../config');
var path = require('path');

module.exports = function (receiver, sender, cb) {
  // 模板目录
  var templatePath = path.resolve(__dirname, '../../../views/mail/message');
  // 激活地址
  var options = {
    // 发送类型
    type: 'email',
    // 接收人
    // toUser: config.name + ' <' + to + '>',
    toUser: receiver.email,
    // 邮件标题
    title: '你有新的聊天消息',
    // 邮件可配置参数
    options: {
      site: config.site,
      receiver: receiver,
      sender: sender,
      im: config.site.client.web.name
    },
    // 模板目录
    path: templatePath,
    // 模板名
    template: 'new.html'
  };
  messager(config.message.adapters.email, options, cb);
};
