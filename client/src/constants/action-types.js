//
// NOTE: all promise based actions are prefixed by default with
// ['PENDING', 'SUCCESS', 'FAILED'] keywords (via promise middleware)
// for better flow control
//

// deps
import define from 'utils/constants';

// website builder
export const LOCATION_TYPES = define([
  'LOCATION_LOAD_MAP'
]);
