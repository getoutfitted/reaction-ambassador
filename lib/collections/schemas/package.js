import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { PackageConfig } from '/lib/collections/schemas/registry';

export const AmbassadorPackageConfig = new SimpleSchema([
  PackageConfig, {
    'settings.api.account': {
      type: String,
      label: 'Ambassador Account Name',
      optional: true
    },
    'settings.api.key': {
      type: String,
      label: 'Ambassador API KEY',
      optional: true
    },
    'settings.public.domain': {
      type: String,
      label: 'Url for Ambassador signup',
      optional: true
    }
  }
]);
