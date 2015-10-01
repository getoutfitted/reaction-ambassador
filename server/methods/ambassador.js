Meteor.methods({
  ambassadorEnabled: function(){
    return ReactionCore.Collections.Packages.findOne({
      name: "reaction-ambassador"
    }).enabled;
  },
  previousImages: function(shopId){
    check(shopId, String);
    // ReactionCore.Collections.Media.remove({'metadata.shopId': shopId, 'metadata.isAmbassador': true});
    // db.cfs.Media.filerecord.remove({'metadata.isAmbassador': true, 'metadata.shopId': shopId });
  }
});

ReactionCore.MethodHooks.after('orderCompleted', function(options){
  // var order = options.result;
  var order = options.arguments[0];
  console.log('Arguments:', order);
  console.log('invoice:', order.payment.invoices);

  // var order = options.arguments[0];
  // ReactionCore.Events.info('===========================');
  // ReactionCore.Events.info('AFTER ORDER COMPLETED FIRED');
  // ReactionCore.Events.info('===========================');
  // console.log("hi my name is paul");

  // ReactionCore.Events.info('ORDER: ' + order._id);
  // console.log("options object: ", options)
  return order;
});

// console.log(Router.current().params);
// ReactionCore.MethodHooks.after('shipmentTracking', function(){
//   console.log("ShipmentTracking");
// });

// ReactionCore.MethodHooks.after('documentPrepare', function(){
//   console.log("documentPrepare");
// });

// ReactionCore.MethodHooks.after('shipmentPacking', function(){
//   console.log("shipmentPacking");
// });

// ReactionCore.MethodHooks.after('processPayment', function(){

//   console.log("processPayment");
// });

// ReactionCore.MethodHooks.after('shipmentShipped', function(){
//   console.log("shipmentShipped");
// });

// ReactionCore.MethodHooks.after('orderCompleted', function(){
//   console.log("orderCompleted");
// });


// ReactionCore.MethodHooks.after('addTracking', function(){
//   console.log("addTracking");
// });

// ReactionCore.MethodHooks.after('addOrderEmail', function(){
//   console.log("addOrderEmail");
// });

// ReactionCore.MethodHooks.after('updateDocuments', function(){
//   console.log("updateDocuments");
// });


// ReactionCore.MethodHooks.after('updateHistory', function(){
//   console.log("updateHistory");
// });

// ReactionCore.MethodHooks.after('inventoryAdjust', function(){
//   console.log("inventoryAdjust");
// });

// ReactionCore.MethodHooks.after('processPayments', function(){
//   console.log("processPayments");
// });

