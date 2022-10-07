import axios from 'axios';

import { store } from '../../redux/store';

const instance = axios.create({
  //baseURL: process.env.REACT_APP_API_URL,
  baseURL: "http://localhost:5050",
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

export default instance;
