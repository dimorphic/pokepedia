// actions types
import { GLOBAL_TYPES } from 'shared/constants/action-types';

export const startRequest = () => {
  return { type: GLOBAL_TYPES.REQUEST_START };
};

export const endRequest = () => {
  return { type: GLOBAL_TYPES.REQUEST_END };
};
