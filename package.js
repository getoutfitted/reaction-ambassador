Package.describe({
  summary: 'Reaction Ambassador - Ambassador brand referral program for Reaction Commerce',
  name: 'getoutfitted:reaction-ambassador',
  version: '0.4.0'
  // git: "https://github.com/reactioncommerce/reaction-paypal.git"
});

Npm.depends({
  'faker': '3.0.1'
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@1.2');
  api.use('meteor-platform');
  api.use('less');
  api.use('http');
  api.use('reactioncommerce:core@0.9.3');
  api.use('reactioncommerce:reaction-accounts@1.2.0');
  api.use('cfs:standard-packages@0.5.9');
  api.use('cfs:storage-adapter@0.2.2');
  api.use('cfs:graphicsmagick@0.0.18');
  api.use('cfs:gridfs@0.0.33');
  api.use('cfs:filesystem@0.1.2');
  api.use('cfs:ui@0.1.3');
  // api.use('iron:core@=1.0.8');
  api.use('iron:router@1.0.12');


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
    'client/templates/ambassadorPage/ambassadorPage.js',
    'client/templates/checkout/completed/completed.js'
  ], 'client');
  api.addFiles([
    'common/router.js',
    'common/collections.js'
  ], ['client', 'server']);
  api.addAssets([
    'images/ambassador.png'
  ],  'client');
  api.addAssets([
    'client/templates/ambassadorPage/ambassadorPage.less'
  ], 'server');
});

Package.onTest(function (api) {
  api.use('sanjo:jasmine@0.19.0');
  api.use('underscore');
  api.use('dburles:factory@0.3.10');
  api.use('velocity:html-reporter@0.9.0');
  api.use('velocity:console-reporter@0.1.3');
  api.use('http');

  api.use('reactioncommerce:core@0.9.0');
  api.use('reactioncommerce:bootstrap-theme');
  api.use('getoutfitted:reaction-ambassador');
  api.addFiles('tests/jasmine/server/integration/methods.js', 'server');
  api.addFiles('tests/jasmine/server/integration/hooks.js', 'server');
  api.addFiles('tests/factories/ambassadorPackage.js', 'server');
  api.addFiles('tests/factories/ordersWithInvoice.js', 'server');
  api.addFiles('tests/lib/faker.js', 'server');
});
