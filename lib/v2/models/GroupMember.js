var defaultNow = require('./_now');

module.exports = {
  connection: 'default',
  identity: 'groupmember',
  schema: true,
  tableName: 'groupmember',
  autoUpdatedAt: false,
  attributes: {
    group: {
      model: 'group',
      required: true
    },
    member: {
      model: 'user',
      required: true
    },
    type: {
      type: 'string',
      enum: ['creator', 'administrator', 'member'],
      defaultsTo: 'member'
    },
    title: {
      type: 'string'
    },
    lastFetch: {
      columnName: 'last_fetch',
      type: 'datetime'
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
