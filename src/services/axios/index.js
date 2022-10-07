import axios from 'axios';

import { store } from '../../redux/store';
import { setError } from '../../redux/request/requestSlice';
import { logout } from '../../redux/user/userSlice';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

instance.interceptors.request.use(
  async config => {
    const state = store.getState();
    if (state.user.userToken) {
      config.headers = {
        Authorization: state.user.userToken,
      };
    }
    return config;
  },
  error => {
    if (error.response && error.response.data.message) {
      store.dispatch(setError(error.response.data.message));
    } else if (error.response && error.response.data) {
      return store.dispatch(setError(error.response.data));
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
    if (error.response.status === 401) {
      store.dispatch(logout());
    }
    if (error.response && error.response.data.message) {
      store.dispatch(setError(error.response.data.message));
    } else if (error.response && error.response.data) {
      return store.dispatch(setError(error.response.data));
    } else {
      store.dispatch(setError(error.message));
    }
    return Promise.reject(error);
  },
);

export default instance;
