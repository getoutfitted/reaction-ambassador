let Media = ReactionCore.Collections.Media;
Template.ambassadorPage.helpers({
  packageData: function() {
    return ReactionCore.Collections.Packages.findOne({
      name: "reaction-ambassador"
    }).settings.public;
  },
  contactInfo: function(){
    let contact = ReactionCore.Collections.Packages.findOne({
      name: "reaction-ambassador"
    }).settings.public.contact;
    if (contact.email && contact.phone){
      return true;
    } else {
      return false;
    }
  }
});


