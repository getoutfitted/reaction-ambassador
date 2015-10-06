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

var ambassador = ReactionCore.Collections.Packages.findOne({
    name: "reaction-ambassador"
  });
var userName = ambassador.settings.api.account;
var apiKey = ambassador.settings.api.key;

ReactionCore.MethodHooks.after('orderCompleted', function(options){

  var order = options.arguments[0];
  console.log('Arguments:', order);
  console.log('invoice:', order.payment.invoices);
  var fullSubtotal = _.reduce(order.payment.invoices, function(total, num) {
    return total + (parseFloat(num.subtotal) - parseFloat(num.discounts));
  }, 0);
  var data2 = {
    'email': order.email,
    'short_code': '6dbT',
    'campaign_uid': '30193',
    'auto_create': '0',
    'transaction_uid': order._id,
    'revenue': fullSubtotal
  };

  console.log("=======================================");
  console.log(userName);
  console.log(apiKey);
  console.log(order.email);
  console.log(order.payment.invoices.subtotal);

  HTTP.call('POST','https://getambassador.com/api/v2/'+ userName + '/'+ apiKey +'/json/event/record', {
    params: data2
  }, function(error, result){
    if(error) {
      console.log(error);
    } else {
      console.log(result);
    }
  });


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

