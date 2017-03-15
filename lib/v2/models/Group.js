
module.exports = {
  connection: 'default',
  identity: 'group',
  schema: true,
  tableName: 'group',
  attributes: {
    name: {
      type: 'string'
    },
    desc: {
      type: 'string'
    },

    // removable

    creator: {
      model: 'user',
      required: true
    },
    createdAt: {
      columnName: 'create_at',
      type: 'datetime',
      defaultsTo: function () {
        return new Date();
      }
    },
    updatedAt: {
      columnName: 'updated_at',
      type: 'datetime',
      defaultsTo: function () {
        return new Date();
      }
    },
    read: {
      type: 'boolean',
      defaultsTo: false
    }
  }
};
