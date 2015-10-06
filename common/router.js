AmbassadorController = ShopController.extend({
  onBeforeAction: function(){
    var ambassador = ReactionCore.Collections.Packages.findOne({
      name: "reaction-ambassador"
      });
    var lowerCaseTitle = ambassador.settings.public.title.toLowerCase();
    var lowerCaseParams = this.params.customTitle.toLowerCase();
    if(! ambassador.enabled){
        this.render('notFound');
      } else if(lowerCaseTitle !== lowerCaseParams){
        this.render('notFound');
      } else {
        this.next();
    }
  }
});

Router.map(function(){
  this.route('dashboard/ambassador', {
    controller: ShopAdminController,
    path: '/dashboard/ambassador',
    template: 'ambassadorSettings',
    waitOn: function(){
      return ReactionCore.Subscriptions.Packages;
    }
  }),

  this.route('ambassadorPage', {
    controller: AmbassadorController,
    path: '/ambassador/:customTitle',
    template: 'ambassadorPage'
  })
});

var ambassadorParams = {

  check: function(){
    var pathParams = this.params.query;
    if (! _.isEmpty(pathParams)){
      if(_.intersection(_.keys(pathParams),  ["campaignid", "mbsy", "mbsy_source"]).length === 3 ){
        var expireTime = new Date();
        var time = expireTime.getTime();
        time += 180 * 24* 60 * 60 * 1000;
        expireTime.setTime(time);
        // document.cookie = "_getoutfitted_ambassador_object=" + JSON.stringify(pathParams) + ";expires=" +expireTime.toUTCString();
        document.cookie = "_getoutfitted_ambassador_campaignid=" + pathParams.campaignid + ";expires=" +expireTime.toUTCString();
        document.cookie = "_getoutfitted_ambassador_mbsy=" + pathParams.mbsy+ ";expires=" +expireTime.toUTCString();;
        document.cookie = "_getoutfitted_ambassador_mbsy_source=" + pathParams.mbsy_source+ ";expires=" +expireTime.toUTCString();;
          Session.set('ambassador', pathParams);
        }
    }
  }
};

Router.onAfterAction(ambassadorParams.check);

