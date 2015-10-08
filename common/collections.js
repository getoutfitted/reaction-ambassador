ReactionCore.Schemas.Ambassador = new SimpleSchema({
  campaignId: {
    type: String,
    optional: true
  },
  mbsy: {
    type: String,
    optional: true
  },
  mbsy_source: {
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

ReactionCore.Schemas.AmbassadorPackageConfig = new SimpleSchema([
  ReactionCore.Schemas.PackageConfig, {
    "settings.api.account": {
      type: String,
      label: "Ambassador Account Name",
      optional: true
    },
    "settings.api.key": {
      type: String,
      label: "Ambassador API KEY",
      optional: true
    },
    "settings.public.title": {
      type: String,
      label: "Title for Embedded Link",
      optional: false
    },
    "settings.public.header": {
      type: String,
      label: "Main Page Header (Required)",
      optional: false
    },
    "settings.public.body": {
      type: String,
      label: "First Paragraph on Main Page (Required)",
      optional: false
    },
    "settings.public.domain": {
      type: String,
      label: "Url for Ambassador signup",
      optional: false
    },
    "settings.public.body2": {
      type: String,
      label: "Second Paragraph (Optional)",
      optional: true
    },
    "settings.public.body3": {
      type: String,
      label: "Third Paragraph (Optional)",
      optional: true
    },
    "settings.public.contact.email": {
      type: String,
      regEx: SimpleSchema.RegEx.Email,
      label: "Contact Email",
      optional: true
    },
    "settings.public.contact.phone": {
      type: String,
      regEx: /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/,
      label: "Contact Phone Number",
      optional: true
    }
  }
]);

ReactionCore.Schemas.AmbassadorAccounts = new SimpleSchema([ReactionCore.Schemas.Accounts, {
  ambassador: {
    type: ReactionCore.Schemas.Ambassador,
    optional: true
  }
}]);

ReactionCore.Collections.Accounts.attachSchema(ReactionCore.Schemas.AmbassadorAccounts);
