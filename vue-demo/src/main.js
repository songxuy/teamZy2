import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import VueLazyload from 'vue-lazyload'
import InfiniteLoading from 'vue-infinite-loading'

Vue.use(InfiniteLoading, {
  props: {
    spinner: 'bubbles',
    distance: 40
    /* other props need to configure */
  },
  system: {
    throttleLimit: 50
    /* other settings need to configure */
  }
})
/* import myPlugin from '@/assets/scripts/lazy.js' */
/* Vue.use(myPlugin, { loading: require('./assets/images/avator.svg') }) */
Vue.config.productionTip = false
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./assets/images/close.png'),
  loading: require('./assets/images/avator.svg'),
  attempt: 1,
  listenEvents: ['scroll', 'touchmove']
})
Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999,
    toolbar: 0,
    keyboard: false,
    title: false,
    movable: true,
    zoomable: false,
    scalable: false
  }
})
new Vue({
  router,
  store,
  render: h => h(App)/* ,
  mounted () {
    document.dispatchEvent(new Event('render-event'))
  } */
}).$mount('#app')
