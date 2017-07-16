// deps
import { create } from 'apisauce';
import { store } from 'shared/store';

// actions
import * as RequestActions from 'shared/actions/request';

//
//  Le API
//
export const API_URI = {
  development: 'localhost:9090',
  production: 'api.pokepedia.fyi'
};

const API_IP = API_URI[process.env.NODE_ENV];

const API = create({
  baseURL: `http://${API_IP}`,
  headers: {
    // 'Authorization': TOKEN, // @TODO
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// intercept request and add status to store
const { interceptors } = API.axiosInstance;

interceptors.request.use((config) => {
  console.debug('!!!! API INTERCEPT BEFORE REQUEST !!!');
  store.dispatch(RequestActions.startRequest());

  return config;
});

interceptors.response.use(
  (response) => {
    console.debug('!!!! API INTERCEPT RESPONSE END !!!');
    store.dispatch(RequestActions.endRequest());

    return response;
  },
  (err) => {
    console.error('!!!! API INTERCEPT RESPONSE ERROR !!!', err);
    // store.dispatch(RequestActions.endRequest());

    return Promise.reject(err);
  }
);

export default API;
