module.exports = {
  connection: 'default',
  identity: 'favorite',
  schema: true,
  tableName: 'favorite',
  attributes: {
    owner: {
      model: 'user',
      required: true
    },
    thread: {
      model: 'thread',
      required: true
    },
    createdAt: {
      type: 'datetime',
      defaultsTo: function () {
        return new Date();
      }
    }
  }
};
