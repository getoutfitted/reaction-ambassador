AmbassadorController = ShopController.extend({
  onBeforeAction: function(){
    if(! ReactionCore.Collections.Packages.findOne({
      name: "reaction-ambassador"
      }).enabled){
        this.render('notFound');
      } else if((ReactionCore.Collections.Packages.findOne({
        name: "reaction-ambassador"
      })).settings.public.title.toLowerCase() !== this.params.customTitle.toLowerCase()){
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


