
function like(models, errors, thread, user) {
  var Thread = models.Thread;
  var ThreadLike = models.ThreadLike;
  return ThreadLike.findOne({
    user: user.id,
    thread: thread.id
  }).then(function (tl) {
    if (tl) {
      return ThreadLike.destroy(tl.id)
        .then(function () {
          return ThreadLike.count({
            thread: thread.id
          });
        })
        .then(function (numbers) {
          return Thread.update(
            {
              id: thread.id
            }, {
              likes: numbers
            }
          );
        })
        .then(function () {
          return errors.LikeExists;
        });
    }
    return ThreadLike.create({
      user: user.id,
      thread: thread.id
    }).then(function () {
      thread.likes++;
      return Promise.all(
        [
          Thread.update(
            {
              id: thread.id
            }, {
              likes: thread.likes
            }
          )
        ]
      );
    }).then(function () {
      return errors.Success;
    });
  });
}

function dislike(models, errors, thread, user) {
  var Thread = models.Thread;
  var ThreadDislike = models.ThreadDislike;
  return ThreadDislike.findOne({
    user: user.id,
    thread: thread.id
  }).then(function (td) {
    if (td) {
      return ThreadDislike.destroy(td.id)
        .then(function () {
          return ThreadDislike.count({
            thread: thread.id
          });
        })
        .then(function (numbers) {
          return Thread.update(
            {
              id: thread.id
            }, {
              dislikes: numbers
            }
          );
        })
        .then(function () {
          return errors.DislikeExists;
        });
    }
    return ThreadDislike.create({
      user: user.id,
      thread: thread.id
    }).then(function () {
      thread.dislikes++;
      return Promise.all(
        [
          Thread.update(
            {
              id: thread.id
            }, {
              dislikes: thread.dislikes
            }
          )
        ]
      );
    }).then(function () {
      return errors.Success;
    });
  });
}

function choose(req, res, thread, action) {
  var user = req.session.user;
  switch (action) {
    case 'dislike':
      return dislike(req.models, res.errors, thread, user);
    case 'like':
    default:
      return like(req.models, res.errors, thread, user);
  }
}

module.exports = function (req, res) {
  var id = (req.params || {}).id;
  var Thread = req.models.Thread;
  var action = req.params.action;

  Thread.findOne({
    id: id
  }).populate('author').then(function (thread) {
    if (!thread) {
      return res.showPage('notify/notify', {
        error: '主题不存在或者已经被删除!'
      });
    }
    choose(req, res, thread, action).then(function (error) {
      switch (action) {
        case 'like':
          switch (error.name) {
            case 'LikeExists':
              return res.showPage('notify/notify', {
                refresh: '/thread/visit/' + thread.id,
                error: '取消喜欢!'
              });
            case 'Success':
            default:
              return res.showPage('notify/notify', {
                refresh: '/thread/visit/' + thread.id,
                error: '喜欢成功!'
              });
          }
        case 'dislike':
        default:
          switch (error.name) {
            case 'DislikeExists':
              return res.showPage('notify/notify', {
                refresh: '/thread/visit/' + thread.id,
                error: '取消不喜欢!'
              });
            case 'Success':
            default:
              return res.showPage('notify/notify', {
                refresh: '/thread/visit/' + thread.id,
                error: '不喜欢成功!'
              });
          }
      }
    }).fail(res.onError);
  });
};
