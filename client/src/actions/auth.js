// deps
import * as AuthAPI from 'api/auth';
import { AUTH_TYPES as TYPES } from 'constants/action-types';

export const login = (user, password) => ({
  type: TYPES.LOGIN,
  payload: AuthAPI.login(user, password)
});
