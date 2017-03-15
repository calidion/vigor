var groupLogic = {
  members: function (models, group) {
    var GroupMember = models.GroupMember;
    return GroupMember.find({
      group: group.id
    })
      .populate('group')
      .populate('member');
    // },
    // isCreator: function(models, user) {
    //     var GroupMember = models.GroupMember;
    //     return GroupMember.findOne({
    //         group: group,
    //         member: user.id,
    //         type: 'creator'
    //     });
  }
};

module.exports = groupLogic;
