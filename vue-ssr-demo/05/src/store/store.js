import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const fetchBar = function() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(111111);
      resolve('sxy');
    }, 3000);
  });
};

export default function createStore() {
  const store = new Vuex.Store({
    state: {
      bar: '123123'
    },

    mutations: {
      'SET_BAR'(state, data) {
        state.bar = data;
      }
    },

    actions: {
      fetchBar({ commit }) {
        return fetchBar().then((data) => {
          commit('SET_BAR', data);
        }).catch((err) => {
          console.error(err);
        })
      }
    }
  });

  if (typeof window !== 'undefined' && window.__INITIAL_STATE__) {
    console.log('window.__INITIAL_STATE__', window.__INITIAL_STATE__);
    store.replaceState(window.__INITIAL_STATE__);
  } else {
    console.log('no browser');
  }
  
  return store;
}
