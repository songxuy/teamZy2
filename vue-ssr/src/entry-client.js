import {
  createApp
} from './app'
import Q from 'q'
import Vue from 'vue'

Vue.mixin({
  beforeRouteUpdate(to, from, next) {
    const {
      asyncData
    } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(next).catch(next)
    } else {
      next()
    }
  }
})

const {
  app,
  router,
  store
} = createApp()

// 将服务端渲染时候的状态写入vuex中
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    // 我们只关心之前没有渲染的组件
    // 所以我们对比它们，找出两个匹配列表的差异组件
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    if (!activated.length) {
      return next()
    }
    // 这里如果有加载指示器(loading indicator)，就触发
    Q.all(activated.map(c => {
      if (c.asyncData) {
        return c.asyncData({
          store,
          route: to
        })
      }
    })).then(() => {
      // 停止加载指示器(loading indicator)
      next()
    }).catch(next)
  })
  app.$mount('#app')
})

// service worker
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/service-worker.js');
// }
if ('serviceWorker' in navigator) {
  console.log("SW present !!! ");
  navigator.serviceWorker.register('/service-worker.js', {
      //scope: '/toto/'
    }).then(function (registration) {
      console.log('Service worker registered : ', registration.scope);
    })
    .catch(function (err) {
      console.log("Service worker registration failed : ", err);
    });

}
