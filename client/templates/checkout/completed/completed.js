Template.cartCompleted.onRendered(function(){
  var cookieValue = function(cookieName) {

    var cookieNameLength = cookieName.length + 1;
    var cookieStart = document.cookie.indexOf(cookieName);
    var cookieEnd = document.cookie.substr(cookieStart).indexOf(";");
    return document.cookie.substr(cookieStart + cookieNameLength, cookieEnd - cookieNameLength);
  };

  var mbsy= cookieValue('_getoutfitted_ambassador_mbsy');
  var campaignId = cookieValue('_getoutfitted_ambassador_campaignid');
  var mbsy_source = cookieValue('_getoutfitted_ambassador_mbsy_source');
  var expirationDate = cookieValue('_getoutfitted_ambassador_referral_expiration');
  var accountId = Meteor.userId();

  Meteor.call('addRefererToAccounts', accountId, mbsy, campaignId, mbsy_source, expirationDate, function(error, result){
    if (error) {
      ReactionCore.Events.error("Did not conver cookies to Account" , error);
      return error;
    }
  });
});
