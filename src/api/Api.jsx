import axios from "axios";
import { store } from "redux/store";
import AuthActions from "redux/auth/actions";
const { logout } = AuthActions;

const Api = axios.create({ baseURL: process.env.REACT_APP_API_URL });

Api.interceptors.request.use(
  async config => {
    if (localStorage.getItem("isLogin") === "true") {
      config.headers = {
        "access-token": localStorage.getItem("Authorization")
      };
    } else {
      config.headers = {};
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

Api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const status = error.response ? error.response.status : null;
    if (status === 401) {
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

export default Api;
