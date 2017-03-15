
module.exports = {
  connection: 'default',
  identity: 'settings',
  schema: true,
  tableName: 'settings',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    user: {
      model: 'user',
      required: true,
      unique: true
    },
    key: {
      type: 'string'
    },
    value: {
      type: 'json'
    }
  }
};
