var defaultNow = require('./_now');

module.exports = {
  connection: 'default',
  identity: 'systemmessagegroupmemberread',
  schema: true,
  tableName: 'systemmessagegroupmemberread',
  attributes: {
    type: 'string',
    group: {
      model: 'group',
      required: true
    },
    member: {
      model: 'user',
      required: true
    },
    lastRead: {
      columnName: 'last_read',
      type: 'datetime',
      defaultsTo: defaultNow
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
    }
  }
};
