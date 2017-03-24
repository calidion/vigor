module.exports = function (req, res, next) {
  var id;
  var ids = /^\/thread\/(remove|edit|delete)\/(\w+)$/.exec(req.url);
  if (ids) {
    id = ids[2];
  } else {
    id = req.body.id;
  }

  if (!req.session || !req.session.user || req.session.user.blocked) {
    var error = '';
    switch (ids[1]) {
      case 'edit':
        error = '你无权编辑当前话题!';
        break;
      case 'remove':
      case 'delete':
      default:
        error = '你无权删除当前话题!';
        break;
    }
    return res.showPage('notify/notify', {
      error: error
    });
  }

  var Thread = req.models.Thread;
  var user = req.session.user;
  Thread.findOne({
    id: id,
    author: user.id
  })
    .populate('author')
    .then(function (thread) {
      if (!thread) {
        return res.showPage('notify/notify', {
          error: '主题不存在或已被删除。'
        });
      }
      req.temporary = {
        thread: thread
      };
      next(true);
    }).fail(function (err) {
      console.error(err);
      next(false);
    });
};
