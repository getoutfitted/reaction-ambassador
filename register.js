import { Reaction } from '/server/api';
Reaction.registerPackage({
  label: 'Ambassador',
  name: 'reaction-ambassador',
  icon: 'fa fa-flag',
  autoEnable: true,
  registry: [{
    provides: 'dashboard',
    label: 'Ambassador',
    route: '/dashboard/ambassador',
    description: 'Ambassador brand referral for Reaction Commerce',
    icon: 'fa fa-flag',
    cycle: '3',
    container: 'getoutfitted',
    workflow: 'ambassdorWorkflow',
    priority: 3
  }, {
    label: 'Ambassador Settings',
    route: 'dashboard/ambassador',
    provides: 'settings',
    container: 'reaction-ambassador',
    template: 'ambassadorSettings'
  }],
  layout: [{
    workflow: "ambassadorWorkflow",
    layout: "coreLayout",
    theme: "default",
    enabled: true,
    structure: {
      template: "ambassadorDashboard",
      layoutHeader: "goLayoutHeader",
      layoutFooter: "goLayoutFooter",
      notFound: "goNotFound",
      dashboardControls: "dashboardControls",
      adminControlsFooter: "adminControlsFooter"
    }
}, {
    workflow: "ambassdorWorkflow",
    layout: "getoutfittedLayout",
    theme: "default",
    enabled: true,
    structure: {
      template: "ambassadorDashboard",
      layoutHeader: "goLayoutHeader",
      layoutFooter: "goLayoutFooter",
      notFound: "goNotFound",
      dashboardControls: "dashboardControls",
      adminControlsFooter: "adminControlsFooter"
    }
  }]
});
