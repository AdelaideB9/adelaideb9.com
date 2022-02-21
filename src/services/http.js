import axios from "axios";
import store from "../store";
import { useToast } from "vue-toastification";
import router from "../router";

const toast = useToast();
const http = axios.create();

http.interceptors.request.use(
  (config) => {
    store.commit("START_LOADING");
    return config;
  },
  (error) => {
    store.commit("FAIL_LOADING");
    if (error.response.data.message) toast.error(error.response.data.message);
    else toast.error(error.response.data);
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    store.commit("FINISH_LOADING");
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      await http.get("/api/refresh").catch((reason) => {
        store.commit("setLoggedIn", false);
      });

      return http(originalRequest);
    }
    store.commit("FAIL_LOADING");
    if (error.response.data.message) toast.error(error.response.data.message);
    else toast.error(error.response.data);
    return Promise.reject(error);
  }
);

export default http;
