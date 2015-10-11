Factory.define('packages', ReactionCore.Collections.Packages, {

  shopId: Factory.get('shop'),
  name: 'reaction-ambassador',
  icon: 'fa fa-flag',
  enabled: false,
  registry: [
    {
      provides: 'dashboard',
      label: 'Ambassador',
      route: 'dashboard/ambassador',
      description: 'Ambassador brand referral for Reaction Commerce',
      icon: 'fa fa-flag',
      cycle: 3,
      container: 'reaction-ambassador'
    },
    {
      label: 'Ambassador Settings',
      route: 'dashboard/ambassador',
      provides: 'settings',
      container: 'reaction-ambassador',
      template: 'ambassadorSettings'
    }
  ]

});

Factory.define('ambassadorPackageWithSettings', ReactionCore.Collections.Packages, Factory.extend('packages', {
  settings: {
    public: {
      title: 'Page Title',
      domain: 'www.google.com',
      header: 'test',
      body: 'test'
    },
    api: {
      account: 'getoutfitted',
      key: '0a3a49c73581bf6189f4c2375b15802e'
    }
  },
  ambassador: {
    mbsy: 'TEST',
    campaignId: '12345',
    mbsySource: '1234_1234_1234_1234',
    expirationDate: 'Tue, 05 Apr 2016 18:11:41 GMT'
  }
}));

