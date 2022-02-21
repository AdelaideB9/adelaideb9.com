import { createStore } from "vuex";
import http from "./services/http";

let store = createStore({
  state: {
    isLoggedIn: false,
    loading: 0,
    loadingFailed: false,
    pageTheme: String,
  },
  mutations: {
    updatePageTheme(state, newPageTheme) {
      state.pageTheme = newPageTheme;
    },
    setLoggedIn(state, val) {
      if (typeof val == "boolean") state.isLoggedIn = val;
    },
    START_LOADING: (state) => {
      state.loading++;
      state.loadingFailed = false;
    },
    FINISH_LOADING: (state) => state.loading--,
    FAIL_LOADING: (state) => {
      state.loading--;
      state.loadingFailed = true;
    },
  },
  actions: {
    async login(state, params) {
      await http.post("/api/login", {
        email: params.email,
        password: params.password,
      });
    },
  },
});

store.watch(
  (state) => [state.loading, state.loadingFailed],
  (newVal, oldVal) => {
    if (newVal[0] == 0) {
      if (newVal[1]) return window.progressBar.fail();
      return window.progressBar.done();
    }
    if (oldVal[0] == 0) return window.progressBar.start();
  }
);

export default store;
