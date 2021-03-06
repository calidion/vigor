var shared = require('../../sharable');

module.exports = {
  urls: [
    '/thread/visit/:id'
  ],
  routers: {
    get: function (req, res) {
      var Thread = req.models.Thread;
      var Post = req.models.Post;
      var RedBagThread = req.models.RedBagThread;
      var extracted = req.extracted.params;
      Thread.findOne(
        {
          id: extracted.id
        }
      )
        .populate('author')
        .then(function (thread) {
          if (!thread) {
            return res.onPageError('此话题不存在或已被删除。');
          }
          if (!thread.author || !thread.author.id) {
            return res.onPageError('作者信息不存在!');
          }
          thread.visits++;
          return Promise.all(
            [
              shared.thread.userCreated(thread.author, Thread),
              shared.thread.unanswered(Thread),
              Post.find({
                thread: thread.id
              }).populate('author'),
              Promise.resolve(thread),
              Thread.update(
                {
                  id: thread.id
                }, {
                  visits: thread.visits
                }
              ),
              RedBagThread.find({
                thread: thread.id
              }).populate('user')
            ]
          ).then(function (data) {
            var thread = data[3];
            thread.posts = data[2];
            thread.redbags = data[5];
            console.log(data[5]);
            res.showPage('thread/visit',
              {
                thread: thread,
                others: data[0],
                unanswered: data[1]
              });
          });
        }).fail(res.onError);
    }
  },
  validations: {
    get: {
      params: {
        id: {
          type: 'string',
          required: true
        }
      }
    }
  }
};
