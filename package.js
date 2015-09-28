Package.describe({
  summary: 'Reaction Ambassador - Ambassador brand referral program for Reaction Commerce',
  name: 'getoutfitted:reaction-ambassador',
  version: '0.1.0',
  // git: "https://github.com/reactioncommerce/reaction-paypal.git"
});

Package.onUse(function(api, where){
  api.versionsFrom('METEOR@1.2');
  api.use('meteor-platform');
  api.use('less');
  api.use('http');
  api.use('reactioncommerce:core@0.6.0');

  api.addFiles([
    'server/register.js',
    'server/methods/ambassador.js'
  ], 'server');
  api.addFiles([
    'client/templates/settings/settings.html',
    'client/templates/settings/settings.js',
    'client/templates/dashboard/dashboard.html',
    'client/templates/dashboard/dashboard.js',
    'client/templates/ambassadorPage/ambassadorPage.html',
    'client/templates/ambassadorPage/ambassadorPage.js'
  ], 'client');
  api.addFiles([
    'common/router.js',
    'common/collections.js',
  ], ['client', 'server']);
  api.addAssets([
    'images/ambassador.png',
  ],  'client');
  api.addAssets([
    'client/templates/ambassadorPage/ambassadorPage.less'
  ], 'server');

});
