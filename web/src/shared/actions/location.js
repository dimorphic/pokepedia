// actions types
import { LOCATION_TYPES } from 'shared/constants/action-types';

export const loadMap = (data) => {
  return {
    type: LOCATION_TYPES.LOCATION_LOAD_MAP,
    payload: { data }
  };
};
