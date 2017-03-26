
var config = require('../../../config');
var userShared = require('../../sharable/user');
var threadShared = require('../../sharable/thread');

module.exports = {
  urls: [
    '/'
  ],
  routers: {
    get: function (req, res) {
      var extracted = req.extracted || {};
      var query = extracted.query || req.query || {};
      var page = query.page > 0 ? query.page : 1;
      var limit = query.limit || config.site.pagination.post;
      var tab = query.tab || '';
      var User = req.models.User;
      var Thread = req.models.Thread;
      var Message = req.models.Message;
      var tabName = '';
      if (tab && tab === 'all') {
        tab = '';
      } else {
        tabName = config.site.tabs.filter(function (item) {
          return item[0] === tab;
        });
        if (tabName) {
          tabName = tabName[1];
        }
      }
      if (page < 1) {
        page = 1;
      }
      var promises = [
        userShared.highestscored(User),
        threadShared.unanswered(Thread),
        threadShared.paginated(Thread, limit, page)
      ];
      var user = req.session.user;
      if (user) {
        promises.push(Message.count({
          receiver: user.id,
          read: false
        }));
      }
      Promise.all(promises).then(function (data) {
        var result = data[2];
        res.showPage('index', {
          threads: result.results,
          page: page,
          limit: limit,
          highestScores: data[0],
          unanswered: data[1],
          messages: data[3],
          total: result.total,
          tabs: config.site.tabs,
          tab: tab,
          title: tabName && (tabName + '版块')
        });
      }).catch(function (err) {
        console.error(err);
        res.showPage('notify/notify', {
          error: '系统出错，请稍候再试'
        });
      });
    }
  },
  validations: {
    get: {
      query: {
        page: {
          type: 'int'
        },
        tab: {
          type: 'string'
        }
      }
    }
  }
};
