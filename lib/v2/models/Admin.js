module.exports = {
  connection: 'default',
  identity: 'admin',
  schema: true,
  tableName: 'admin',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    user: {
      model: 'user',
      required: true,
      unique: true
    },
    privileges: {
      type: 'string'
    }
  }
};
