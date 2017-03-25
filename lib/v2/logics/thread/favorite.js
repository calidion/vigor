
function favorite(models, errors, thread, user) {
  var User = models.User;
  var Thread = models.Thread;
  var Favorite = models.Favorite;
  return Favorite.findOne({
    owner: user.id,
    thread: thread.id
  }).then(function (favorite) {
    if (favorite) {
      return errors.FavoriteExists;
    }
    return Favorite.create({
      owner: user.id,
      thread: thread.id
    }).then(function () {
      user.favoriteThreads++;
      thread.favorites++;
      return Promise.all(
        [
          User.update(
            {
              id: user.id
            },
            {
              favoriteThreads: user.favoriteThreads
            }
          ),
          Thread.update(
            {
              id: thread.id
            }, {
              favorites: thread.favorites
            }
          )
        ]
      );
    }).then(function () {
      return errors.Success;
    });
  });
}

module.exports = function (req, res) {
  var user = req.session.user;
  var id = (req.params || {}).id;
  var Thread = req.models.Thread;
  Thread.findOne({
    id: id
  }).populate('author').then(function (thread) {
    if (!thread) {
      return res.showPage('notify/notify', {
        error: '主题不存在或者已经被删除!'
      });
    }
    favorite(req.models, res.errors, thread, user).then(function (error) {
      switch (error.name) {
        case 'FavoriteExists':
          return res.showPage('notify/notify', {
            refresh: '/thread/visit/' + thread.id,
            error: '主题已经收藏过，不再重复收藏!'
          });
        case 'Success':
        default:
          return res.showPage('notify/notify', {
            refresh: '/thread/visit/' + thread.id,
            error: '收藏成功!'
          });
      }
    }).fail(res.onError);
  });
};
