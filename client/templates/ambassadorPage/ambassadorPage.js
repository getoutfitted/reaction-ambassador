Template.ambassadorPage.helpers({
  packageData: function() {
    return ReactionCore.Collections.Packages.findOne({
      name: "reaction-ambassador"
    }).settings.public;
  },
  contactInfo: function(){
    var contact = ReactionCore.Collections.Packages.findOne({
      name: "reaction-ambassador"
    }).settings.public.contact;
    if (contact.email && contact.phone){
      return true;
    } else {
      return false;
    }
  }
});
