<template>
  <div class="textArea">
    <textarea name="" id="" cols="30" rows="10" v-model="value"></textarea>
    <button @click="sayHello">click</button>
    <div>{{value}}</div>
  </div>
</template>

<script>
export default {
  name: 'textArea',
  data () {
    return {
      value: ''
    }
  },
  methods: {
    sayHello () {
      this.$emit('value', this.value)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
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
div{
  white-space: pre-wrap;
}
</style>
