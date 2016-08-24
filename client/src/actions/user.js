// deps
import * as UserAPI from 'api/user';
import { INVENTORY_TYPES as TYPES } from 'constants/action-types';

export const getUserInventories = (userId) => ({
  type: TYPES.INVENTORIES,
  payload: UserAPI.getUserInventories(userId)
});

export const getUserInventory = (userId, inventoryId) => ({
  type: TYPES.INVENTORY,
  payload: UserAPI.getUserInventory(userId, inventoryId)
});
