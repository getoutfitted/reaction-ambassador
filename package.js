Package.describe({
  summary: "Reaction Ambassador - Ambassador brand referral program for Reaction Commerce",
  name: "getoutfitted:reaction-ambassador",
  version: "0.1.0",
  // git: "https://github.com/reactioncommerce/reaction-paypal.git"
});

Package.onUse(function(api, where){
  api.versionsFrom('METEOR@1.1.0.2');
  api.use("meteor-platform");
  api.use("less");
  api.use("http");
  api.use("reactioncommerce:core@0.6.0");
});
