import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import info from "./info";
import category from "./category";
import record from "./record";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: null,
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    },
  },
  actions: {
    async fetchCurrency() {
      const key = process.env.VUE_APP_FIXER;
      const res = await fetch(
        `http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,UAH,EUR,RUB`
      );
      return await res.json();
    },
    async fetchNews(ctx, country) {
      const key = process.env.VUE_APP_NEWS;
      const res = await fetch(
        "http://newsapi.org/v2/top-headlines?" +
          `country=${country}&` +
          `apiKey=${key}`
      );
      return await res.json();
    },
  },
  getters: {
    error: (s) => s.error,
  },
  modules: {
    auth,
    info,
    category,
    record,
  },
});
