module.exports = {
  connection: 'default',
  identity: 'friend',
  schema: true,
  tableName: 'friend',
  autoUpdatedAt: false,
  attributes: {
    user: {
      model: 'user',
      required: true
    },
    friend: {
      model: 'user',
      required: true
    },
    createdAt: {
      columnName: 'created_at',
      type: 'datetime',
      defaultsTo: function () {
        return new Date();
      }
    }
  }
};
