<template>
  <div class="about">
    <div class="name">
        <span>用户名：</span>
        <input type="text" v-model="form.username"/>
    </div>
    <div>
        <span>密码：</span>
        <input type="password" v-model="form.password" />
    </div>
    <div>
        <span>重复密码：</span>
        <input type="password" v-model="form.password1" />
    </div>
    <div>
        <span>年龄：</span>
        <input type="text" v-model="form.age" />
    </div>
    <div>
        <button @click="regis">注册</button>
    </div>
    <p>{{$store.state.message}}</p>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
axios.defaults.withCredentials = true
axios.defaults.crossDomain = true
export default {
  name: 'regis',
  data () {
    return {
        form: {
        username: '',
        password: '',
        password1: '',
        age: ''
      }
    }
  },
  computed: {
    ...mapState([
      'message'
    ])
  },
  methods: {
    regis () {
        if(!this.form.username || !this.form.password || !this.form.age){
            alert('请填写完整！')
        }else if(this.form.password!=this.form.password1){
            alert('两次密码不一致')
        }else{
          axios.post('/api/regis',{
              username: this.form.username,
              password: this.form.password,
              age: this.form.age
          })
          .then(res => {
            alert(res.message)
          })
        }
    }
  },
  mounted () {
    /* axios.get('/api/json')
    .then(res => {
      console.log(res)
    }) */
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
</style>
