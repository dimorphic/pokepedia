// deps
import API from './api';

export function login(username, password) {
  return API.post('/login', { username, password });
}
