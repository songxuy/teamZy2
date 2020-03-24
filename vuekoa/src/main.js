// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'
axios.defaults.withCredentials = true
axios.defaults.crossDomain = true
Vue.config.productionTip = false
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  config.headers.common['Authorization'] = 'Bearer ' + token;
  return config;
})
axios.interceptors.response.use((response)=>{
  if(response.data.code == 401){
    alert('请登录在进行操作！')
    localStorage.removeItem('token')
    router.push('/')
  }else{
    return response.data
  }
}, (error)=>{
  return Promise.reject(error)
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
