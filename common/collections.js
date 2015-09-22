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
    }
  }
]);
