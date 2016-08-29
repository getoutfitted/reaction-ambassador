import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Reaction, Logger } from '/server/api';
import { _ } from 'meteor/underscore';

import { Packages, Accounts, Orders } from '/lib/collections';

import { createClient } from 'mbsy';


function beforeExpiration(expirationString) {
  let expirationDate = new Date(expirationString);
  let todayDate = new Date();
  if (expirationDate >= todayDate) {
    return true;
  } else {
    return false;
  }
}
function ambassadorEnabled() {
  const ambassador =  Packages.findOne({
    name: 'reaction-ambassador',
    shopId: Reaction.getShopId()
  });
  if (ambassador) {
    return ambassador.enabled;
  }
}

Meteor.methods({
  ambassadorEnabled: function () {
    ambassadorEnabled()
  },
  'ambassador/addRefererToAccounts': function (ambassador) {
    check(ambassador, {
      campaignId: String,
      mbsy: String,
      mbsySource: String
    })
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
  // 'ambassador/verifyAndSendAmbassadorDetails': function (orderId) {
  //   check(orderId, String)
  //   const order = Orders.findOne(orderId);
  //   const account = Accounts.findOne({
  //     _id: order.userId,
  //     ambassador: {
  //       $exists: true
  //     }
  //   });
  //   const ambassadorPackage =  Packages.findOne({
  //     name: 'reaction-ambassador',
  //     shopId: Reaction.getShopId()
  //   });
  //   if (account
  //       && ambassadorPackage
  //       && ambassadorPackage.enabled
  //       && ambassadorPackage.settings
  //       && ambassadorPackage.settings.api
  //       && beforeExpiration(account.ambassador.expirationDate)) {
  //       const api = ambassadorPackage.settings.api;
  //       const Mbsy = createClient(api.account, api.key);
  //       if (order) {
  //         const invoice = order.billing[0].invoice
  //         const ambassadorReportableRevenue = invoice.subtotal - invoice.discounts;
  //         Mbsy.Event.record({
  //           email: order.email,
  //           campaign_uid: account.ambassador.campaignId,
  //           short_code: account.ambassador.mbsy,
  //           revenue: ambassadorReportableRevenue,
  //           auto_create: 0,
  //           transaction_uid: order._id,
  //         }, function (err, res) {
  //           if (err) {
  //             Logger.error('Ambassaodor encountered an Error', err)
  //           } else {
  //             Logger.Info()
  //           }
  //         });
  //       }
  //   } else {
  //     Logger.warn(`Ambassador settings are missing. Data for ${}`);
  //   }
  // }
});
