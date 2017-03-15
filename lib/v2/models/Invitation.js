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
    code: {
      type: 'string',
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
