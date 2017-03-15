var defaultNow = require('./_now');

module.exports = {
  connection: 'default',
  identity: 'userblocked',
  schema: true,
  tableName: 'userblocked',
  autoUpdatedAt: false,
  attributes: {
    user: {
      model: 'user',
      required: true
    },
    blocked: {
      model: 'user',
      required: true
    },
    createdAt: {
      type: 'datetime',
      defaultsTo: defaultNow
    }
  }
};
