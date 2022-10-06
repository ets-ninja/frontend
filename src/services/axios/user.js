import axios from 'axios';

import { store } from '../../redux/store';
import { logout } from '../../redux/user/userSlice';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

instance.interceptors.request.use(async config => {
  const state = store.getState();
  if (state.user.userToken) {
    config.headers = {
      Authorization: state.user.userToken,
    };
  }
  return config;
});

instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401) {
      store.dispatch(logout());
    }
    return Promise.reject(error);
  },
);

export default instance;
