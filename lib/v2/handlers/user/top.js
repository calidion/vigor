var sharable = require('../../sharable');
module.exports = {
  urls: ['/user/top'],
  routers: {
    get: function (req, res) {
      var User = req.models.User;
      sharable.user.highest100(User).then(function (users) {
        res.showPage('user/top', {
          users: users,
          pageTitle: '排名前100的用户!'
        });
      }).fail(res.onError);
    }
  }
};
