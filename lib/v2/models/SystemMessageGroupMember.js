var defaultNow = require('./_now');

module.exports = {
  connection: 'default',
  identity: 'systemmessagegroupmember',
  schema: true,
  tableName: 'systemmessagegroupmember',
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
