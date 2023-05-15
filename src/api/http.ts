import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_DOMAIN;
const API_TOKEN = process.env.REACT_APP_API_TOKEN;

const http = axios.create({
  baseURL: BASE_URL,
});

http.interceptors.request.use(
  function (config) {
    (config.headers as any)["Authorization"] = "bearer " + API_TOKEN;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default http;
