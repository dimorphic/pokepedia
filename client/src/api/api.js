// deps
import { create } from 'apisauce';
import { store } from '../store';

// @TODO
// import RequestActions from './actions/request';

//
//  Le API
//
// const API_IP = 'api.pokepedia.fyi'; // '0.0.0.0';
// const API_PORT = 9090;

const API_IP = 'localhost'; // '0.0.0.0';
const API_PORT = 8800;

const API = create({
  baseURL: `http://${API_IP}:${API_PORT}`,
  headers: {
    // 'Authorization': TOKEN, // @TODO
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// intercept request and add status to store
const { interceptors } = API.axiosInstance;

interceptors.request.use((config) => {
  // console.log('!!!! INTERCEPT BEFORE REQUEST !!!');
  // store.dispatch(RequestActions.startLoad());
  return config;
});

interceptors.response.use(
  (response) => {
    // store.dispatch(RequestActions.endLoad());
    return response;
  },
  (err) => {
    // store.dispatch(RequestActions.errorLoad());
    return Promise.reject(err);
  }
);

export default API;
