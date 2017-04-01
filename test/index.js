'use strict';

require('should');
// process.env.LOG_QUERIES = true;

describe('forim', function () {
  require('./pages/filters');
  require('./ws/main');
  require('./v2/failures/notLogin');
  require('./v2/github');
  require('./v2/user');
  require('./v2/message');
  require('./v2/thread');
  require('./v2/post');
  require('./v2/file');
  require('./v2/password');
  require('./v2/util/at');
  require('./v2/settings');
  require('./v2/mailer');
  require('./v2/site');
  require('./v2/socket.io');
  require('./v2/friend');
  require('./v2/im');
  require('./v2/group');

  require('./v2/weixin/settings');
  require('./v2/weixin/pages');
  require('./v2/weixin/api');
  require('./v2/weixin/settings.func');
});
