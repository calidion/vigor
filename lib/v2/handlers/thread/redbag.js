var isLogin = require('../../policies/isLogin');

module.exports = {
  urls: [
    '/thread/redbag/:id'
  ],
  routers: {
    get: function (req, res) {
      var RedBagThread = req.models.RedBagThread;
      var extracted = req.extracted.params;
      RedBagThread.findOne(
        {
          id: extracted.id
        }
      ).populate('user').populate('thread').then(function (redbag) {
        if (!redbag) {
          return res.onPageError('此红包不存在或已被删除。');
        }
        res.showPage('thread/redbag', {
          redbag: redbag
        });
      }).fail(res.onError);
    }
  },
  policies: {
    all: isLogin
  },
  validations: {
    get: {
      params: {
        id: {
          type: 'string',
          required: true
        }
      }
    },
    post: {
      required: ['body'],
      params: {
        id: {
          type: 'string',
          required: true
        }
      },
      body: {
        value: {
          type: 'int',
          required: true
        }
      }
    }
  }
};
