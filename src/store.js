import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

// createStore将会由
export function createStore() {
  return new Vuex.Store({
    state: {
      count: 18,
    },
    mutations: {
      add(state) {
        state.count += 1;
      },
    },
  });
}
