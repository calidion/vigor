/**
 * 未注册用户邀请表
 */

var defaultNow = require('./_now');

module.exports = {
  connection: 'default',
  identity: 'groupmemberinvite',
  schema: true,
  tableName: 'groupmemberinvite',
  autoUpdatedAt: false,
  attributes: {
    sender: {
      model: 'user',
      required: true
    },
    group: {
      model: 'group',
      required: true
    },
    email: {
      type: 'email',
      required: true
    },
    token: {
      type: 'string',
      required: true
    },
    processed: {
      type: 'boolean',
      defaultsTo: false
    },
    createdAt: {
      columnName: 'create_at',
      type: 'datetime',
      defaultsTo: defaultNow
    }
  }
};
