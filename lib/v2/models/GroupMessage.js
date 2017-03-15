var defaultNow = require('./_now');

module.exports = {
  connection: 'default',
  identity: 'groupmessage',
  schema: true,
  tableName: 'groupmessage',
  autoUpdatedAt: false,
  attributes: {
    text: 'text',
    group: {
      model: 'group',
      required: true
    },
    sender: {
      model: 'user',
      required: true
    },
    createdAt: {
      columnName: 'create_at',
      type: 'datetime',
      defaultsTo: defaultNow
    }
  }
};
