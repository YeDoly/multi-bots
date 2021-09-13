import { createStore } from "vuex";
import Cookies from "js-cookie";

export default createStore({
  state: {
    user: null,
    guild: null,
  },
  getters: {
    getUser(state) {
      return state.user || Cookies.get("user");
    },
    getGuild(state) {
      return state.guild || Cookies.get("guild");
    },
  },
  mutations: {
    updateUser(state, id) {
      state.user = id;
    },
    updateGuild(state, id) {
      state.guild = id;
    },
  },
  actions: {
    setUser({ commit }, id) {
      Cookies.set("user", id, { expires: 3, secure: true });
      commit("updateUser", id);
    },
    setGuild({ commit }, id) {
      Cookies.set("guild", id, { expires: 3, secure: true });
      commit("updateGuild", id);
    },
  },
});
