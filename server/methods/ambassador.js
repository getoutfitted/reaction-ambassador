Meteor.methods({
  ambassadorEnabled: function(){
    return ReactionCore.Collections.Packages.findOne({
      name: "reaction-ambassador"
    }).enabled;
  },
  previousImages: function(shopId){
    check(shopId, String);
    // ReactionCore.Collections.Media.remove({'metadata.shopId': shopId, 'metadata.isAmbassador': true});
    // db.cfs.Media.filerecord.remove({'metadata.isAmbassador': true, 'metadata.shopId': shopId });
  }
});
