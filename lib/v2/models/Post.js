var defaultNow = require('./_now');

module.exports = {
  connection: 'default',
  identity: 'post',
  schema: true,
  tableName: 'post',
  autoUpdatedAt: false,
  attributes: {
    content: 'text',
    thread: {
      model: 'thread',
      required: true
    },
    author: {
      model: 'user',
      required: true
    },
    parent: {
      model: 'post'
    },
    createdAt: {
      columnName: 'create_at',
      type: 'datetime',
      defaultsTo: defaultNow
    },
    updatedAt: {
      columnName: 'update_at',
      type: 'datetime',
      defaultsTo: defaultNow
    },
    like: {
      collection: 'postlike',
      via: 'post'
    },
    likes: {
      type: 'int',
      defaultsTo: 0
    },
    deleted: {
      type: 'boolean',
      defaultsTo: false
    }
  }
};
