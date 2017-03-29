module.exports = {
  connection: 'default',
  identity: 'letsenc',
  schema: true,
  tableName: 'letsenc',
  autoUpdatedAt: false,
  attributes: {
    key: {
      type: 'string',
      required: true
    },
    value: {
      type: 'string',
      required: true
    }
  }
};
