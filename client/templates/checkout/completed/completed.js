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
  var accountId = Meteor.userId();

  Meteor.call('addRefererToAccounts', accountId, mbsy, campaignId, mbsy_source, function(error, result){
    if (error) {
      console.log("error", error);
    } else {
      console.log("success");
    }
  });
});
