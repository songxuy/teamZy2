import Vue from 'vue'
import Vuex from 'vuex'
import io from 'socket.io-client'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    socket: null,
    message: ''
  },
  mutations: {
    setSocket (state) {
      if (!state.socket) {
        state.socket = io(`http://localhost:8888`, {
          transports: ['websocket']
        })
        state.socket.on('message', msg => {
          console.log(msg)
        })
      }
    }
  },
  actions: {

  }
})
