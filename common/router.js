Router.map(function(){
  this.route('dashboard/ambassador'), {
    controller: ShopAdminController,
    path: '/dashboard/ambassador',
    template: 'zopimSettings',
    waitOn: function(){
      return ReactorCore.Subscriptions.Packages;
    }
  };
});


  var ambassador = ReactionCore.Collections.Packages.findOne({
      name: "reaction-ambassador"
    });
// var ambassador = ReactionCore.Collections.Packages.findOne({
//       name: "reaction-ambassador"
//     });
if (ambassador.enabled) {
  var urlName = ambassador.settings.title.toLowerCase();
  Router.map(function(urlName){
    this.route('ambassador', {
      controller: ShopAdminController,
      path: '/ambassador/'+ urlName,
      template: 'ambassadorPage',
      // waitOn: function(){
      //   return ReactorCore.Subscriptions.Packages;
      // },
      // data: function(){
      //   return ambassador.settings.title.toLowerCase();
      // }
    })
  });
  // var urlName = ambassador.settings.title.toLowerCase();
  // Router.map(function(urlName){
  //   this.route("ambassador"), {
  //     controller: ShopAdminController,
  //     path: '/' + urlName,
  //     template: 'ambassadorPage',
  //     waitOn: function(){
  //       return ReactorCore.Subscriptions.Packages;
  //     }
  //   };
  // });
}
