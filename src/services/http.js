import axios from "axios";
import store from "../store";
import { useToast } from "vue-toastification";
import router from "../router";

const toast = useToast();
const http = axios.create();

http.interceptors.request.use((config) => {
  if (!config._retry) {
    store.commit("START_LOADING");
  }
  return config;
});

http.interceptors.response.use(
  (response) => {
    store.commit("FINISH_LOADING");
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await axios.get("/api/refresh");
        return http(originalRequest);
      } catch (err) {
        store.commit("auth/setLoggedIn", false);
        router.push("/");
        store.commit("FAIL_LOADING");
        if (err.response.data.message) toast.error(err.response.data.message);
        else toast.error("Unknown error");
        return Promise.reject(err);
      }
    }
    store.commit("FAIL_LOADING");
    if (error.response.data.message) toast.error(error.response.data.message);
    else toast.error("Unknown error");
    return Promise.reject(error);
  }
);

export default http;
