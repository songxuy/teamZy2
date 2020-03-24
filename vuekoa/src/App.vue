<template>
  <div id="app">
    <router-link to="/">home</router-link><router-link to="/regis">regis</router-link><router-link to="/about">about</router-link>
    <!-- <hello></hello> -->
    <!-- <backtop></backtop> -->
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios'
import hello from './components/HelloWorld'
import backtop from './components/backtop'
axios.defaults.withCredentials = true
axios.defaults.crossDomain = true
export default {
  name: 'App',
  components:{
    hello,
    backtop
  },
  data () {
    return {
      show: false
    }
  },
  beforeCreate(){
    console.log('app beforeCreate')
  },
  created () {
    console.log('app create')
  },
  beforeMount () {
    console.log('app beforeMount')
  },
  mounted () {
    this.$store.commit('setSocket')
    console.log('app mounted')
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
a{
  margin-left:30px;
  margin-bottom:20px;
  display: inline-block;
}
</style>
