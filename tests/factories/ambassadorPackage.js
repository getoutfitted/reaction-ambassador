Factory.define('packages', ReactionCore.Collections.Packages, {

  shopId: Factory.get('shop'),
  name : "reaction-ambassador",
  icon : "fa fa-flag",
  enabled : false,
  registry : [
    {
      "provides" : "dashboard",
      "label" : "Ambassador",
      "route" : "dashboard/ambassador",
      "description" : "Ambassador brand referral for Reaction Commerce",
      "icon" : "fa fa-flag",
      "cycle" : 3,
      "container" : "reaction-ambassador"
    },
    {
      "label" : "Ambassador Settings",
      "route" : "dashboard/ambassador",
      "provides" : "settings",
      "container" : "reaction-ambassador",
      "template" : "ambassadorSettings"
    }
  ],
});
