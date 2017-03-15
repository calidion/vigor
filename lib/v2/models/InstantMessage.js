var defaultNow = require('./_now');

module.exports = {
  connection: 'default',
  identity: 'instantmessage',
  schema: true,
  tableName: 'instantmessage',
  autoUpdatedAt: false,
  attributes: {
    text: 'text',
    receiver: {
      model: 'user',
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
