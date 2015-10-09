Meteor.methods({
  ambassadorEnabled: function () {
    let ambassador =  ReactionCore.Collections.Packages.findOne({
      name: 'reaction-ambassador'
    });
    if (ambassador) {
      return ambassador.enabled;
    }
  },
  previousImages: function (shopId) {
    check(shopId, String);
    // ReactionCore.Collections.Media.remove({'metadata.shopId': shopId, 'metadata.isAmbassador': true});
    // db.cfs.Media.filerecord.remove({'metadata.isAmbassador': true, 'metadata.shopId': shopId });
  },
  addRefererToAccounts: function (accountId, mbsy, campaignId, mbsySource, expirationDate) {
    check(accountId, String);
    check(mbsy, String);
    check(campaignId, String);
    check(mbsySource, String);
    check(expirationDate, String);

    if (Meteor.userId() !== accountId) {
      throw new Meteor.Error(403, 'Access Denied');
    }

    ReactionCore.Collections.Accounts.update({_id: accountId}, {
      $set: {
        ambassador: {
          mbsy: mbsy,
          campaignId: campaignId,
          mbsySource: mbsySource,
          expirationDate: expirationDate
        }
      }
    });
  }
});

function expirationVerification(stringDate) {
  let expirationDate = new Date(stringDate);
  let todayDate = new Date();
  if (expirationDate >= todayDate) {
    return true;
  } else {
    return false;
  }
}

ReactionCore.MethodHooks.after('orders/orderCompleted', function (options) {
  let ambassador = ReactionCore.Collections.Packages.findOne({
    name: 'reaction-ambassador'
  });
  let order = options.arguments[0];
  let accountId = order.userId;
  let cookieInfo = ReactionCore.Collections.Accounts.findOne({_id: accountId}).ambassador;
  let validDate = expirationVerification(cookieInfo.expirationDate);

  if (ambassador.enabled && order.email && validDate) {
    let userName = ambassador.settings.api.account;
    let apiKey = ambassador.settings.api.key;
    let fullSubtotal = _.reduce(order.billing, function (total, num) {
      return total + (parseFloat(num.invoice.subtotal) - parseFloat(num.invoice.discounts));
    }, 0);

    let data = {
      email: order.email,
      short_code: cookieInfo.mbsy,
      campaign_uid: cookieInfo.campaignId,
      auto_create: 0,
      transaction_uid: order._id,
      revenue: fullSubtotal
    };


    HTTP.call('POST','https://getambassador.com/api/v2/' + userName + '/' + apiKey + '/json/event/record', {
      params: data
    }, function (error, result) {
      if (error) {
        ReactionCore.Log.error('Failed to record Ambassador event for ambassador with code' + cookieInfo.mbsy, error);
        return error;
      }
    });
    return order;
  }
});
