AmbassadorController = ShopController.extend({
  onBeforeAction: function(){
    if(! ReactionCore.Collections.Packages.findOne({
      name: "reaction-ambassador"
      }).enabled){
        this.render('notFound');
      } else {
        this.next();
    }
  }
});

Router.map(function(){
  this.route('dashboard/ambassador'), {
    controller: ShopAdminController,
    path: '/dashboard/ambassador',
    template: 'ambassadorSettings',
    waitOn: function(){
      return ReactionCore.Subscriptions.Packages;
    }
  },

  this.route('ambassador', {
    controller: AmbassadorController,

  })
});



// var ambassador = ReactionCore.Collections.Packages.findOne({
//     name: "reaction-ambassador"
//   });
// if (ambassador.enabled) {
//   var urlName = ambassador.settings.public.title.toLowerCase();
//   Router.map(function(urlName){
//     this.route('ambassador', {
//       controller: ShopAdminController,
//       path: '/ambassador/'+ urlName,
//       template: 'ambassadorPage',
//       waitOn: function(){
//         return ReactorCore.Subscriptions.Packages;
//       },
//       data: function(){
//         return ambassador.settings.title.toLowerCase();
//       }
//     });
//   });
// }
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
// }
