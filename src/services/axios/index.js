import axios from 'axios';

import { store } from '../../redux/store';
import { setError } from '../../redux/request/requestSlice';

const errorsBlacklist = ['/api/auth/refresh'];

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

instance.interceptors.request.use(
  async config => {
    const state = store.getState();
    if (state.auth.isLoggedIn && state.auth.token) {
      config.headers = {
        Authorization: state.auth.token,
      };
    }
    return config;
  },
  error => {
    if (error.response && error.response.data.message) {
      store.dispatch(setError(error.response.data.message));
    } else if (error.response && error.response.data) {
      store.dispatch(setError(error.response.data));
    } else {
      store.dispatch(setError(error.message));
    }
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (errorsBlacklist.some(endpoint => endpoint === error.config?.url)) {
      return Promise.reject(error);
    }
    if (error.response && error.response.data.message) {
      store.dispatch(setError(error.response.data.message));
    } else if (error.response && error.response.data) {
      store.dispatch(setError(error.response.data));
    } else {
      store.dispatch(setError(error.message));
    }
    return Promise.reject(error);
  },
);

export default instance;
