Meteor.methods({
  ambassadorEnabled: function(){
    return ReactionCore.Collections.Packages.findOne({
      name: "reaction-ambassador"
    }).enabled;

  }
});
