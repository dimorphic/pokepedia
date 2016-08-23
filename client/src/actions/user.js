// deps
import * as UserAPI from 'api/user';
import { INVENTORY_TYPES as TYPES } from 'constants/action-types';

export const getUserInventory = (userId) => ({
  type: TYPES.INVENTORY,
  payload: UserAPI.getUserInventory(userId)
});
