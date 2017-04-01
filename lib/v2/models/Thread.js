var defaultNow = require('./_now');

module.exports = {
  connection: 'default',
  identity: 'thread',
  schema: true,
  tableName: 'thread',
  autoUpdatedAt: false,
  attributes: {
    title: {
      type: 'string',
      required: true
    },
    content: {
      type: 'text',
      required: true
    },
    author: {
      model: 'user',
      required: true
    },
    posts: {
      collection: 'post',
      via: 'thread'
    },

    redbags: {
      collection: 'redbag',
      via: 'thread'
    },
    // 置顶帖
    sticky: {
      type: 'boolean',
      defaultsTo: false
    },
    // 精华贴
    highlighted: {
      type: 'boolean',
      defaultsTo: false
    },
    // 锁定贴
    locked: {
      type: 'boolean',
      defaultsTo: false
    },
    replies: {
      type: 'int',
      defaultsTo: 0
    },
    visits: {
      type: 'int',
      defaultsTo: 0
    },
    likes: {
      type: 'int',
      defaultsTo: 0
    },
    dislikes: {
      type: 'int',
      defaultsTo: 0
    },
    favorites: {
      type: 'int',
      defaultsTo: 0
    },
    createdAt: {
      columnName: 'created_at',
      type: 'datetime',
      defaultsTo: defaultNow
    },
    updatedAt: {
      columnName: 'updated_at',
      type: 'datetime',
      defaultsTo: defaultNow
    },
    lastReplier: {
      columnName: 'last_reply',
      model: 'user'
    },
    lastPost: {
      columnName: 'last_post',
      model: 'post'
    },
    lastReplyAt: {
      columnName: 'last_reply_at',
      type: 'datetime',
      defaultsTo: defaultNow
    },
    category: {
      type: 'string'
    },
    deleted: {
      type: 'boolean',
      defaultsTo: false
    }
  }
};
