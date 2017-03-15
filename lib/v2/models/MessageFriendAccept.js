var defaultNow = require('./_now');

/**
 * 好友请求与处理结果的
 */

module.exports = {
  connection: 'default',
  identity: 'messagefriendaccept',
  schema: true,
  tableName: 'messagefriendaccept',
  attributes: {
    user: {
      model: 'user',
      required: true
    },
    friend: {
      model: 'user',
      required: true
    },
    accepted: {
      type: 'boolean',
      defaultsTo: true
    },
    processed: {
      type: 'boolean',
      defaultsTo: false
    },
    createdAt: {
      columnName: 'create_at',
      type: 'datetime',
      defaultsTo: defaultNow
    },
    updatedAt: {
      columnName: 'processed_at',
      type: 'datetime',
      defaultsTo: defaultNow
    }
  }
};
