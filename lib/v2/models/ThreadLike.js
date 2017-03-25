var defaultNow = require('./_now');

module.exports = {
  connection: 'default',
  identity: 'threadlike',
  schema: true,
  tableName: 'threadlike',
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
    createdAt: {
      columnName: 'created_at',
      type: 'datetime',
      defaultsTo: defaultNow
    }
  }
};
