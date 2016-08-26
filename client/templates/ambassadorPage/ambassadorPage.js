import { Template } from 'meteor/templating';
import { Packages } from '/lib/collections';
import { getShopId } from '/lib/api';
import './ambassadorPage.html';
import './ambassadorPage.less';

Template.ambassadorPage.helpers({
  packageData: function () {
    return Packages.findOne({
      name: "reaction-ambassador",
      shopId: getShopId()
    }).settings.public;
  },
  contactInfo: function (){
    let contact = Packages.findOne({
      name: "reaction-ambassador",
      shopId: getShopId()
    }).settings.public.contact;
    if (contact.email && contact.phone){
      return true;
    } else {
      return false;
    }
  }
});


