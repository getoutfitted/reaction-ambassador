import { Router } from '/client/api';
import { check } from 'meteor/check';
import _ from 'lodash';

function getQueryParams(query) {
  check(query, String);
  const stringQuery = query.substring(1);
  const keyValues = stringQuery.split('&');
  let queryParams = {};
  keyValues.forEach(function (keyValue) {
    const keyValueSplit = keyValue.split('=');
    queryParams[keyValueSplit[0]] = keyValueSplit[1]
  })
  return queryParams;
}

Router.Hooks.onEnter(function () {
  if (location.search) {
    const queryParams = getQueryParams(location.search);
    const keys = Object.keys(queryParams);
    const ambassdorKeys = ['campaignid', 'mbsy', 'mbsy_source'];
    const hasAllKeys = _.intersection(keys, ambassdorKeys).length === 3;
    if (hasAllKeys) {
      const ambassdor = {
        campaignId: queryParams.campaignid,
        mbsy: queryParams.mbsy,
        mbsySource: queryParams.mbsy_source
      }
      Meteor.call('ambassador/addRefererToAccounts', ambassdor);
    }
  }
});
