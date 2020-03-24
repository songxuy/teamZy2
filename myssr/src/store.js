import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const fetchBar = function() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(20);
    }, 1000);
  });
};
export function createStore() {
  const store =  new Vuex.Store({
    state: {
      age: 12,
      name: 'sxy'
    },
    mutations: {
      'SET_AGE'(state, data) {
        state.age = data;
      }
    },
    actions: {
      fetchBar({ commit }) {
        return fetchBar().then((data) => {
          console.log(data)
          commit('SET_AGE', data);
        }).catch((err) => {
          console.error(err);
        })
      }
    }
  });
  if (typeof window !== 'undefined' && window.__INITIAL_STATE__) {
    console.log('window.__INITIAL_STATE__', window.__INITIAL_STATE__);
    store.replaceState(window.__INITIAL_STATE__);
  }
  
  return store;
}
