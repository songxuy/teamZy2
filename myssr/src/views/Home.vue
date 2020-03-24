<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" @click="say">
    <p>{{age}}</p>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
 const fetchInitialData = async ({ store }) => {
    await store.dispatch('fetchBar');
  };
export default {
  name: 'home',
  asyncData: fetchInitialData,
  components: {
    HelloWorld
  },
  methods: {
    say () {
      alert(this.$store.state.age)
    }
  },
  computed: {
    age () {
      return this.$store.state.age
    }
  }
}
</script>
