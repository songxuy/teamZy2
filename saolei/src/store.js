import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    row: 9,
    column: 9,
    boomNum: 10,
    type: 1// 1  9*9  2  3 4
  },
  mutations: {
    SETDATA (state, payload) {
      state.row = payload.row
      state.column = payload.column
      state.boomNum = payload.boomNum
      state.type = payload.type
    }
  },
  actions: {

  },
  getters: {
    getData: (state) => {
      let data = {}
      data.row = state.row
      data.column = state.column
      data.boomNum = state.boomNum
      return data
    },
    type: state => state.type
  }
})
