var Media = ReactionCore.Collections.Media;


Template.ambassadorSettings.helpers({
  packageData: function() {
    return ReactionCore.Collections.Packages.findOne({
      name: "reaction-ambassador"
    });
  },
  imageName: function(){
    var shopId = ReactionCore.getShopId();
    if (ReactionCore.Collections.Media.findOne({'metadata.isAmbassador': true, 'metadata.shopId': shopId})) {
      return ReactionCore.Collections.Media.findOne({'metadata.isAmbassador': true, 'metadata.shopId': shopId}, {sort: { uploadedAt: -1}}).original.name;
    } else {
      return ;
    }
  },
  imageBase: function(){
    var shopId = ReactionCore.getShopId();
    return ReactionCore.Collections.Media.find({'metadata.isAmbassador': true, 'metadata.shopId': shopId}, {sort: { uploadedAt: -1}});
  }
});

Template.ambassadorSettings.events({
  "change #ambassadorFile": function(event, template){
    var userId = Meteor.userId();
    var shopId = ReactionCore.getShopId();
    // if (Media.find({"metadata.shopId": shopId, 'metadata.isAmbassador': true}).count() > 1 ){
    //   Meteor.call('previousImages', shopId);
    // }
    return FS.Utility.eachFile(event, function(file) {
      var fileObj = new FS.File(file);
      fileObj.metadata = {
        isAmbassador: true,
        uploadedBy: userId,
        shopId: shopId
      };
      Media.insert(fileObj);
    });
  }
});

AutoForm.hooks({
  "ambassador-update-form": {
    onSuccess: function(operation, result, template) {
      Alerts.removeSeen();
      return Alerts.add("Ambassador settings saved.", "success", {
        autoHide: true
      });
    },
    onError: function(operation, error, template) {
      Alerts.removeSeen();
      return Alerts.add("Ambassador settings update failed. " + error, "danger");
    }
  }
});
