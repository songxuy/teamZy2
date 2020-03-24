import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import About from '@/pages/about'
import Regis from '@/pages/regis'
Vue.use(Router)

const guardRoute = (to, from, next) => {
  var token = localStorage.getItem('token')
  if(!token) {
    alert('请先登录！')
    next('/')
  } else {
    next()
  }
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      beforeEnter: guardRoute
    },
    {
      path: '/regis',
      name: 'regis',
      component: Regis
    }
  ]
})
