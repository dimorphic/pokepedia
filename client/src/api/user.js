// deps
import API from './api';

export function getUserInventories(userId) {
  return API.get(`/user/${userId}/inventories`);
}

export function getUserInventory(userId, inventoryId) {
  return API.get(`/user/${userId}/inventories/${inventoryId}`);
}
