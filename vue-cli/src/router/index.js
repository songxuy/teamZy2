import Vue from 'vue'
import VueRouter from "vue-router";
Vue.use(VueRouter)
export default new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/Home',
      component: () => import(/* webpackChunkName: "home" */ '../views/home.vue')
      // component: home
    },
    {
      path: '/About',
      component: () => import(/* webpackChunkName: "about" */ '../views/about.vue')
      // component: about
    },
    {
      path: '*',
      redirect: '/Home'
    }
  ]
})