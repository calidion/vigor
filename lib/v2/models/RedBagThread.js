var defaultNow = require('./_now');

module.exports = {
  connection: 'default',
  identity: 'redbagthread',
  schema: true,
  tableName: 'redbagthread',
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
    paid: {
      type: 'boolean',
      defaultsTo: false
    },
    createdAt: {
      columnName: 'created_at',
      type: 'datetime',
      defaultsTo: defaultNow
    }
  }
};
