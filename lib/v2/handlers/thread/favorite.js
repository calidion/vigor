var isLogin = require('../../policies/isLogin');
var paginator = require('waterline-paginator');

var favorite = require('../../logics/thread/favorite');

module.exports = {
  urls: [
    '/thread/favorite',
    '/thread/favorite/:id'
  ],
  routers: {
    get: function (req, res) {
      var User = req.models.User;
      var Thread = req.models.Thread;
      var params = req.extracted.params;
      var query = req.extracted.query || {};
      if (query.action === 'add') {
        return favorite(req, res);
      }
      var result;
      var user;
      var options = {
        or: [
          {
            username: params.id
          }, {
            id: params.id
          }
        ]
      };
      User.findOne(options).then(function (found) {
        if (!found) {
          return res.status(404).showPage(
            'notify/notify', {
              error: '这个用户不存在。'
            });
        }
        user = found;
        return found;
      }).then(function (found) {
        query.limit = query.limit || 10;
        query.page = query.page > 0 ? query.page : 1;
        return new Promise(function (resolve, reject) {
          paginator.paginate({
            conditions: {
              owner: found.id
            },
            model: req.models.Favorite,
            limit: query.limit,
            page: query.page
          }, function (err, pagable) {
            if (err) {
              console.error(err, result);
              reject(err);
            }
            result = pagable;
            var data = result.results;
            var threads = [];
            data.forEach(function (item) {
              threads.push(item.thread);
            });
            resolve(threads);
          });
        });
      }).then(function (threads) {
        var sql = {
          id: threads,
          sort: 'createdAt asc'
        };
        return Thread.find(sql)
          .populate('author')
          .populate('lastReplier');
      }).then(function (threads) {
        res.showPage('thread/favorite', {
          user: user,
          threads: threads,
          total: result.total,
          page: result.page,
          count: result.count
        });
      }).fail(res.onError);
    },
    post: favorite
  },
  policies: {
    post: isLogin
  },
  validations: {
    get: {
      query: {
        action: {
          type: 'string'
        },
        id: {
          type: 'string'
        }
      },
      params: {
        id: {
          type: 'string',
          required: true
        }
      }
    // },
    // post: {
    //   body: {
    //     id: {
    //       type: 'string',
    //       required: true
    //     }
    //   }
    }
  },
  failures: {
    policy: function (data, req, res) {
      res.onError('你无权删除当前话题!', req, res);
    },
    validation: function (data, req, res) {
      res.onError('输入不正确!', req, res);
    }
  }
};
