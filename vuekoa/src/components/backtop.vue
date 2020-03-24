<template>
  <div class="backtop">
  </div>
</template>

<script>
import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.crossDomain = true
export default {
  name: 'backtop',
  data () {
    return {
    }
  },
  methods: {
  },
  beforeCreate(){
    console.log('backtop beforeCreate')
  },
  created () {
    console.log('backtop create')
  },
  beforeMount () {
    console.log('backtop beforeMount')
  },
  mounted () {
    console.log('backtop mounted')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
