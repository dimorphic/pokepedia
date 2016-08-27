// actions types
import { GLOBAL_TYPES } from 'constants/action-types';

export const startRequest = () => {
  console.log('ACTION START REQ!');
  return { type: GLOBAL_TYPES.REQUEST_START };
};

export const endRequest = () => {
  console.log('ACTION END REQ!');
  return { type: GLOBAL_TYPES.REQUEST_END };
};
