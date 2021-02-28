import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

// createStore将会由
export function createStore() {
  return new Vuex.Store({
    state: {
      count: 0,
    },
    mutations: {
      // 加⼀个初始化
      init(state, count) {
        state.count = count;
      },
      add(state) {
        state.count += 1;
      },
    },
    actions: {
      // 加⼀个异步请求count的action
      getCount({ commit }) {
        return new Promise(resolve => {
          setTimeout(() => {
            commit("init", Math.random() * 100);
            resolve();
          }, 1000);
        });
      },
    },
  });
}
