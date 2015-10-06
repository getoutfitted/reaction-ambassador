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

var cookieValue = function(cookieName) {

  var cookieNameLength = cookieName.length + 1;
  var cookieStart = document.cookie.indexOf(cookieName);
  var cookieEnd = document.cookie.substr(cookieStart).indexOf(";");
  return document.cookie.substr(cookieStart + cookieNameLength, cookieEnd - cookieNameLength);
};

ReactionCore.MethodHooks.after('orderCompleted', function(options){

  var order = options.arguments[0];
  console.log('Arguments:', order);
  console.log('invoice:', order.payment.invoices);
  var fullSubtotal = _.reduce(order.payment.invoices, function(total, num) {
    return total + (parseFloat(num.subtotal) - parseFloat(num.discounts));
  }, 0);
  var data2 = {
    'email': order.email,
    'short_code': cookieValue('_getoutfitted_ambassador_mbsy'),
    'campaign_uid': cookieValue('_getoutfitted_ambassador_campaignid'),
    'auto_create': '0',
    'transaction_uid': order._id,
    'revenue': fullSubtotal
  };


  HTTP.call('POST','https://getambassador.com/api/v2/'+ userName + '/'+ apiKey +'/json/event/record', {
    params: data2
  }, function(error, result){
    if(error) {
      console.log(error);
    } else {
      console.log(result);
    }
  });

  return order;
});
