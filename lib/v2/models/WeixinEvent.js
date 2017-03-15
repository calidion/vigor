module.exports = {
  connection: 'default',
  identity: 'wxevent',
  schema: true,
  tableName: 'wxevent',
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
