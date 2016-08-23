// deps
import API from './api';

export function getUserInventory(userId) {
  return API.get(`/user/${userId}/inventory`);
}
