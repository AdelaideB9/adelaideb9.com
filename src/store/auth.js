import http from "../services/http";
import router from "../router";

const state = () => ({
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  session: {},
});

const getters = {};

const actions = {
  async login({ dispatch }, params) {
    await http.post("/api/login", {
      email: params.email,
      password: params.password,
    });
    dispatch("refreshSession");
  },
  async logout({ commit }) {
    await http.get("/api/logout");
    commit("setLoggedIn", false);
    commit("setSession", {});
    router.push("/");
  },
  async refreshSession({ commit }) {
    try {
      let res = await http.get("/api/session");
      commit("setLoggedIn", true);
      commit("setSession", res.data);
    } catch (e) {
      commit("setLoggedIn", false);
      router.push("/");
    }
  },
};

const mutations = {
  setLoggedIn(state, val) {
    if (typeof val == "boolean") {
      state.isLoggedIn = val;
      localStorage.setItem("isLoggedIn", val);
    }
  },
  setSession(state, val) {
    if (typeof val == "object") state.session = val;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
