import axios from 'axios';

import { store } from '../../redux/store';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

instance.interceptors.request.use(async config => {
  const state = store.getState();
  if (state.auth.isLoggedIn && state.auth.token) {
    config.headers = {
      Authorization: state.auth.token,
    };
  }
  return config;
});

export default instance;
