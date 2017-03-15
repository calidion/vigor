var defaultNow = require('./_now');

module.exports = {
  connection: 'default',
  identity: 'message',
  schema: true,
  tableName: 'message',
  autoUpdatedAt: false,
  attributes: {
    type: 'string',
    receiver: {
      model: 'user',
      required: true
    },
    sender: {
      model: 'user',
      required: true
    },
    thread: {
      model: 'thread',
      required: true
    },
    replier: {
      model: 'user',
      required: true
    },
    createdAt: {
      columnName: 'create_at',
      type: 'datetime',
      defaultsTo: defaultNow
    },
    updatedAt: {
      columnName: 'updated_at',
      type: 'datetime',
      defaultsTo: defaultNow
    },
    read: {
      type: 'boolean',
      defaultsTo: false
    }
  }
};
