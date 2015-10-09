AmbassadorController = ShopController.extend({
  onBeforeAction: function () {
    let ambassador = ReactionCore.Collections.Packages.findOne({
      name: 'reaction-ambassador'
    });
    let lowerCaseTitle = ambassador.settings.public.title.toLowerCase();
    let lowerCaseParams = this.params.customTitle.toLowerCase();
    if (! ambassador.enabled) {
      this.render('notFound');
    } else if (lowerCaseTitle !== lowerCaseParams) {
      this.render('notFound');
    } else {
      this.next();
    }
  }
});

Router.map(function () {
  this.route('dashboard/ambassador', {
    controller: ShopAdminController,
    path: '/dashboard/ambassador',
    template: 'ambassadorSettings',
    waitOn: function () {
      return ReactionCore.Subscriptions.Packages;
    }
  }),

  this.route('ambassadorPage', {
    controller: AmbassadorController,
    path: '/ambassador/:customTitle',
    template: 'ambassadorPage'
  })
});

let ambassadorParams = {
  check: function () {
    let pathParams = this.params.query;
    if (! _.isEmpty(pathParams)) {
      if (_.intersection(_.keys(pathParams), ['campaignid', 'mbsy', 'mbsySource']).length === 3) {
        let expireTime = new Date();
        let time = expireTime.getTime();
        time += 180 * 24 * 60 * 60 * 1000;
        expireTime.setTime(time);

        document.cookie = '_getoutfitted_ambassador_campaignid=' + pathParams.campaignid + ';expires=' + expireTime.toUTCString();
        document.cookie = '_getoutfitted_ambassador_mbsy=' + pathParams.mbsy + ';expires=' + expireTime.toUTCString();
        document.cookie = '_getoutfitted_ambassador_mbsy_source=' + pathParams.mbsySource + ';expires=' + expireTime.toUTCString();
        document.cookie = '_getoutfitted_ambassador_referral_expiration=' + expireTime.toUTCString() + ';expires=' + expireTime.toUTCString();
      }
    }
  }
};

Router.onAfterAction(ambassadorParams.check);
