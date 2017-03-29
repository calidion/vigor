module.exports = {
  message: {
    new: require('../messages/mail/message/new')
  },
  friend: {
    add: require('../messages/mail/friend/add')
  },
  user: {
    activate: require('../messages/mail/user/activate'),
    password: {
      reset: require('../messages/mail/user/password/reset')
    }
  },
  group: {
    member: {
      invite: require('../messages/mail/group/member/invite')
    }
  },
  thread: {
    invite: require('../messages/mail/thread/invite')
  }
};
