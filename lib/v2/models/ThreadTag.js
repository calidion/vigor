var defaultNow = require('./_now');

module.exports = {
  connection: 'default',
  identity: 'threadtag',
  schema: true,
  tableName: 'threadtag',
  autoUpdatedAt: false,
  attributes: {
    tags: {
      model: 'tag'
    },
    thread: {
      model: 'thread',
      required: true
    },
    order: {
      type: 'int',
      required: true,
      defaultsTo: 0
    },
    official: {
      type: 'boolean',
      required: true,
      defaultsTo: false
    },
    createdAt: {
      type: 'datetime',
      defaultsTo: defaultNow
    }
  }
};
