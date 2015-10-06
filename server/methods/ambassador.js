Meteor.methods({
  ambassadorEnabled: function(){
    var ambassador =  ReactionCore.Collections.Packages.findOne({
      name: "reaction-ambassador"
    });
    if (ambassador) {
      return ambassador.enabled;
    }
  },
  ambassador: function(){
    return ReactionCore.Collections.Packages.findOne({
      name: "reaction-ambassador"
    });
  },
  previousImages: function(shopId){
    check(shopId, String);
    // ReactionCore.Collections.Media.remove({'metadata.shopId': shopId, 'metadata.isAmbassador': true});
    // db.cfs.Media.filerecord.remove({'metadata.isAmbassador': true, 'metadata.shopId': shopId });
  },
  addRefererToAccounts: function(accountId, mbsy, campaignId, mbsy_source){
    check(accountId, String);
    check(mbsy, String);
    check(campaignId, String);
    check(mbsy_source, String);
    if(this.userId !== accountId){
      throw new Meteor.Error(403, "Access Denied");
    }

    // if(currentUserId !== accountId)
    //   return;

    ReactionCore.Collections.Accounts.update({_id: accountId}, {
      $set: {
        ambassador: {
          mbsy: mbsy,
          campaignId: campaignId,
          mbsy_source: mbsy_source
        }
      }
    });
  },
  getAmbassadorCookiesInfo : function(accountId){
    check(accountId, String);
    if(this.userId !== accountId){
      throw new Meteor.Error(403, "Access Denied");
    }
    console.log("past throw")
    return ReactionCore.Collections.Accounts.findOne({_id: accountId}).ambassador;
  }

});

if (Meteor.call("ambassadorEnabled")){
  var ambassador = Meteor.call('ambassador');
  var userName = ambassador.settings.api.account;
  var apiKey = ambassador.settings.api.key;
}



ReactionCore.MethodHooks.after('orderCompleted', function(options){
  var order = options.arguments[0];
  var fullSubtotal = _.reduce(order.payment.invoices, function(total, num) {
    return total + (parseFloat(num.subtotal) - parseFloat(num.discounts));
  }, 0);
  var accountId = order.userId;
  var cookieInfo = Meteor.call('getAmbassadorCookiesInfo', accountId);
  if (typeof(order.email) === 'undefined') {
    order.email = "tester" + _.random(1, 1000000) + "@example.com";
  }
  var data = {
    'email': order.email,
    'short_code': cookieInfo.mbsy,
    'campaign_uid': cookieInfo.campaignId,
    'auto_create': '0',
    'transaction_uid': order._id,
    'revenue': fullSubtotal
  };


  HTTP.call('POST','https://getambassador.com/api/v2/'+ userName + '/'+ apiKey +'/json/event/record', {
    params: data
  }, function(error, result){
    if(error) {
      console.log(error);
    } else {
      console.log(result);
    }
  });

  return order;
});
