import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Accounts } from '/lib/collections/schemas';

export const Ambassador = new SimpleSchema({
  campaignId: {
    type: String,
    optional: true
  },
  mbsy: {
    type: String,
    optional: true
  },
  mbsySource: {
    type: String,
    optional: true
  },
  referralClickDate: {
    type: Date,
    optional: true
  },
  expirationDate: {
    type: String,
    optional: true
  }
});

export const AmbassadorAccounts = new SimpleSchema([
  Accounts, {
    ambassador: {
      type: Ambassador,
      optional: true
    }
  }
]);
