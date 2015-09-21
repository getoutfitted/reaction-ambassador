ReactionCore.registerPackage({
  label: "Ambassador",
  name: "reaction-ambassador",
  icon: "fa fa-flag",
  autoEnable: false,
  registry: [
    {
      provides: "dashboard",
      label: "Ambassador",
      route: "dashboard/ambassador",
      description: "Ambassador brand referral for Reaction Commerce",
      route: "dashboard/ambassador",
      icon: "fa fa-flag",
      cycle: "3",
      container: "reaction-ambassador",
    }, {
      label: "Ambassador Settings",
      route: "dashboard/ambassador",
      provides: "settings",
      container: "reaction-ambassador",
      template: "ambassadorSettings"
    }
  ],
  permissions: [
    {
      label: "Ambassador",
      permission: "dashboard/ambassador",
      group: "Shop Settings"
    }
  ]
});
