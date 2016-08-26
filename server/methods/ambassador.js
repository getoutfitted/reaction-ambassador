import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Reaction } from '/server/api';
import { _ } from 'meteor/underscore';

import { Packages, Accounts } from '/lib/collections';
Meteor.methods({
  ambassadorEnabled: function () {
    let ambassador =  Packages.findOne({
      name: 'reaction-ambassador',
      shopId: Reaction.getShopId()
    });
    if (ambassador) {
      return ambassador.enabled;
    }
  },
  // addRefererToAccounts: function (accountId, mbsy, campaignId, mbsySource, expirationDate) {
    // check(accountId, String);
    // check(mbsy, String);
    // check(campaignId, String);
    // check(mbsySource, String);
    // check(expirationDate, String);
  addRefererToAccounts: function (ambassador) {
    check(ambassador, {
      campaignId: String,
      mbsy: String,
      mbsySource: String
    })
    console.log('user', this.userId);
    let expireTime = new Date();
    let time = expireTime.getTime();
    time += 180 * 24 * 60 * 60 * 1000;
    expireTime.setTime(time);
    const ambassadorWithExpiration = _.clone(ambassador);
    ambassadorWithExpiration.expirationDate = expireTime;
    Accounts.update({
      _id: this.userId,
      ambassador: {
        $exists: false
      }
    }, {
      $set: {
        ambassador: ambassadorWithExpiration
      }
    });
  }
});

// function expirationVerification(stringDate) {
//   let expirationDate = new Date(stringDate);
//   let todayDate = new Date();
//   if (expirationDate >= todayDate) {
//     return true;
//   } else {
//     return false;
//   }
// }
// ReactionCore.MethodHooks.after('orders/capturePayments', function (options) {
//   let ambassador = ReactionCore.Collections.Packages.findOne({
//     name: 'reaction-ambassador'
//   });
//   let orderId = options.arguments[0];
//   let order = ReactionCore.Collections.Orders.findOne({_id: orderId});
//   let accountId = order.userId;
//   let cookieInfo = ReactionCore.Collections.Accounts.findOne({_id: accountId}).ambassador;
//   let validDate = expirationVerification(cookieInfo.expirationDate);

//   if (ambassador.enabled && order.email && validDate) {
//     let userName = ambassador.settings.api.account;
//     let apiKey = ambassador.settings.api.key;
//     let fullSubtotal = _.reduce(order.billing, function (total, num) {
//       return total + (parseFloat(num.invoice.subtotal) - parseFloat(num.invoice.discounts));
//     }, 0);

//     let data = {
//       email: order.email,
//       short_code: cookieInfo.mbsy,
//       campaign_uid: cookieInfo.campaignId,
//       auto_create: 0,
//       transaction_uid: order._id,
//       revenue: fullSubtotal
//     };


//     HTTP.call('POST', 'https://getambassador.com/api/v2/' + userName + '/' + apiKey + '/json/event/record', {
//       params: data
//     }, function (error, result) {
//       if (error) {
//         ReactionCore.Log.error('Failed to record Ambassador event for ambassador with code' + cookieInfo.mbsy, error);
//         return error;
//       }
//     });
//     return order;
//   }
// });
// ReactionCore.MethodHooks.after('orders/orderCompleted', function (options) {
//   let ambassador = ReactionCore.Collections.Packages.findOne({
//     name: 'reaction-ambassador'
//   });
//   let order = options.arguments[0];
//   let accountId = order.userId;
//   let cookieInfo = ReactionCore.Collections.Accounts.findOne({_id: accountId}).ambassador;
//   let validDate = expirationVerification(cookieInfo.expirationDate);

//   if (ambassador.enabled && order.email && validDate) {
//     let userName = ambassador.settings.api.account;
//     let apiKey = ambassador.settings.api.key;
//     let fullSubtotal = _.reduce(order.billing, function (total, num) {
//       return total + (parseFloat(num.invoice.subtotal) - parseFloat(num.invoice.discounts));
//     }, 0);

//     let data = {
//       email: order.email,
//       short_code: cookieInfo.mbsy,
//       campaign_uid: cookieInfo.campaignId,
//       auto_create: 0,
//       transaction_uid: order._id,
//       revenue: fullSubtotal
//     };


//     HTTP.call('POST','https://getambassador.com/api/v2/' + userName + '/' + apiKey + '/json/event/record', {
//       params: data
//     }, function (error, result) {
//       if (error) {
//         ReactionCore.Log.error('Failed to record Ambassador event for ambassador with code' + cookieInfo.mbsy, error);
//         return error;
//       }
//     });
//     return order;
//   }
// });
