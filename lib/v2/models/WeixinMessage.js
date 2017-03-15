module.exports = {
  connection: 'default',
  identity: 'wxmessage',
  schema: true,
  tableName: 'wxmessage',
  autoUpdatedAt: false,
  attributes: {
    from: {
      type: 'string'
    },
    to: {
      type: 'string'
    },
    event: {
      type: 'string'
    },
    message: {
      type: 'json'
    },
    autoCreatedAt: {
      columnName: 'created_at',
      type: 'datetime'
    }
  }
};
