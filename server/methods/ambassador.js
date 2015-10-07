Meteor.methods({
  ambassadorEnabled: function(){
    var ambassador =  ReactionCore.Collections.Packages.findOne({
      name: "reaction-ambassador"
    });
    if (ambassador) {
      return ambassador.enabled;
    }
  },
  previousImages: function(shopId){
    check(shopId, String);
    // ReactionCore.Collections.Media.remove({'metadata.shopId': shopId, 'metadata.isAmbassador': true});
    // db.cfs.Media.filerecord.remove({'metadata.isAmbassador': true, 'metadata.shopId': shopId });
  },
  addRefererToAccounts: function(accountId, mbsy, campaignId, mbsy_source, expirationDate){
    check(accountId, String);
    check(mbsy, String);
    check(campaignId, String);
    check(mbsy_source, String);
    check(expirationDate, String);
    console.log('=================================')
    console.log('this: ', this);
    console.log('meteor user', Meteor.userId());
    console.log('accountID', accountId);
    if(Meteor.userId() !== accountId){
      throw new Meteor.Error(403, "Access Denied");
    }

    ReactionCore.Collections.Accounts.update({_id: accountId}, {
      $set: {
        ambassador: {
          mbsy: mbsy,
          campaignId: campaignId,
          mbsy_source: mbsy_source,
          expirationDate: expirationDate
        }
      }
    });
  }
});

var expirationVerification = function(stringDate){
  var expirationDate = new Date(stringDate);
  var todayDate = new Date();
  if (expirationDate >= todayDate) {
    return true;
  } else {
    return false;
  }
};

ReactionCore.MethodHooks.after('orderCompleted', function(options){
  var ambassador = ReactionCore.Collections.Packages.findOne({
      name: "reaction-ambassador"
    });
  var order = options.arguments[0];
  var accountId = order.userId;
  var cookieInfo = ReactionCore.Collections.Accounts.findOne({_id: accountId}).ambassador;
  var validDate = expirationVerification(cookieInfo.expirationDate);

  if (ambassador.enabled && order.email && validDate) {
    var userName = ambassador.settings.api.account;
    var apiKey = ambassador.settings.api.key;
    var fullSubtotal = _.reduce(order.payment.invoices, function(total, num) {
      return total + (parseFloat(num.subtotal) - parseFloat(num.discounts));
    }, 0);

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
        ReactionCore.Events.error("Failed to record Ambassador event for ambassador with code" + cookieInfo.mbsy, error);
        return error;
      }
    });
  }

  return order;
});
