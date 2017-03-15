module.exports = {
  connection: 'default',
  identity: 'file',
  schema: true,
  tableName: 'file',
  autoUpdatedAt: false,
  attributes: {
    user: {
      model: 'user',
      required: true
    },
    filename: {
      type: 'string',
      required: true
    },
    url: {
      type: 'string',
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
