var defaultNow = require('./_now');

module.exports = {
  connection: 'default',
  identity: 'invitation',
  schema: true,
  tableName: 'invitation',
  autoUpdatedAt: false,
  attributes: {
    from: {
      model: 'user',
      required: true
    },
    email: {
      type: 'email',
      required: true
    },
    token: {
      type: 'string',
      required: true
    },
    thread: {
      model: 'thread',
      required: true
    },
    processed: {
      type: 'boolean',
      defaultsTo: false
    },
    createdAt: {
      type: 'datetime',
      defaultsTo: defaultNow
    }
  }
};
