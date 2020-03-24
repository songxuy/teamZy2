<template>
  <div class="Home">
    <h2>Home</h2>
  </div>
</template>

<script>
import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.crossDomain = true
export default {
  name: 'Home',

  data() {
    return {};
  },
  mounted () {
    axios.get('http://127.0.0.1:3000/string')
    .then((res) => {
      console.log(res)
    })
  }
};
</script>

<style lang="css" scoped>
</style>
