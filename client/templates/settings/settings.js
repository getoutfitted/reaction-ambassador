Template.ambassadorSettings.helpers({
  packageData: function() {
    return ReactionCore.Collections.Packages.findOne({
      name: "reaction-ambassador"
    });
  }
});

AutoForm.hooks({
  "ambassador-update-form": {
    onSuccess: function(operation, result, template) {
      Alerts.removeSeen();
      return Alerts.add("Ambassador settings saved.", "success", {
        autoHide: true
      });
    },
    onError: function(operation, error, template) {
      Alerts.removeSeen();
      return Alerts.add("Ambassador settings update failed. " + error, "danger");
    }
  }
});
