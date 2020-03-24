<template>
  <div class="about">
    <h1>about</h1>
    <button @click="add">ADD AGE</button>
  </div>
</template>

<script>
import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.crossDomain = true
export default {
  name: 'HelloWorld',
  data () {
    return {
    }
  },
  methods:{
    add(){
      axios.get('/api/insert')
      .then(res => {
        if(res !== undefined) {
          alert(res.message)
        }
      })
    }
  },
  mounted () {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
button{
  position: relative;
  padding:10px 20px;
  background-color: green;
  color:#fff;
  cursor: pointer;
}
</style>
