var defaultNow = require('./_now');

module.exports = {
  connection: 'default',
  identity: 'redbag',
  schema: true,
  tableName: 'redbag',
  autoUpdatedAt: false,
  attributes: {
    user: {
      model: 'user',
      required: true
    },
    thread: {
      model: 'thread',
      required: true
    },
    // 分为单位
    value: {
      type: 'int',
      defaultsTo: 0
    },
    createdAt: {
      columnName: 'created_at',
      type: 'datetime',
      defaultsTo: defaultNow
    }
  }
};
