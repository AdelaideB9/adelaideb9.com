import { createStore } from "vuex";
import authModule from "./auth";

let store = createStore({
  state: {
    loading: 0,
    loadingFailed: false,
    pageTheme: String,
  },
  mutations: {
    updatePageTheme(state, newPageTheme) {
      state.pageTheme = newPageTheme;
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
  actions: {},
  modules: {
    auth: authModule,
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
