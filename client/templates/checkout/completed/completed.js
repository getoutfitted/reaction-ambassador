Template.cartCompleted.onRendered(function () {
  function cookieValue(cookieName) {
    let cookieNameLength = cookieName.length + 1;
    let cookieStart = document.cookie.indexOf(cookieName);
    let cookieEnd = document.cookie.substr(cookieStart).indexOf(';');
    if (cookieEnd === -1) {
      return document.cookie.substr(cookieStart + cookieNameLength);
    } else {
      return document.cookie.substr(cookieStart + cookieNameLength, cookieEnd - cookieNameLength);
    }
  }

  let mbsy = cookieValue('_getoutfitted_ambassador_mbsy');
  let campaignId = cookieValue('_getoutfitted_ambassador_campaignid');
  let mbsySource = cookieValue('_getoutfitted_ambassador_mbsy_source');
  let expirationDate = cookieValue('_getoutfitted_ambassador_referral_expiration');
  let accountId = Meteor.userId();

  Meteor.call('addRefererToAccounts', accountId, mbsy, campaignId, mbsySource, expirationDate, function (error, result) {
    if (error) {
      ReactionCore.Logs.error('Did not conver cookies to Account', error);
      return error;
    }
  });
});
