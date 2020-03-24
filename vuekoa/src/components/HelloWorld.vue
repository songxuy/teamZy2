<template>
  <div class="hello">
    <input type="text" v-model="form.username"/>
    <input type="password" v-model="form.password" />
    <button @click="submit">登录</button>
    <span class="i1"></span>
    <i class="i2"></i>
    <i class="i3"></i>
    <i class="i4"></i>
    <i class="i5"></i>
    <i class="i6"></i>
    <i class="i7"></i>
    <i class="i8"></i>
    <i class="i9"></i>
    <i class="i10"></i>
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
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    submit () {
      if(!this.form.username || !this.form.password ) {
        alert('输入完整!')
      } else {
        axios.post('/api/login',{
          username: this.form.username,
          password: this.form.password
        }).then(res => {
          if(res.code==200){
            localStorage.setItem('token', res.data);
            this.$store.commit('setSocket')
            alert('登陆成功~')
          }else{
            alert(res.message)
          }
        })
      }
    }
  },
  beforeCreate(){
    console.log('/ beforeCreate')
  },
  created () {
    console.log('/ create')
  },
  beforeMount () {
    console.log('/ beforeMount')
  },
  mounted () {
    console.log('/ mounted')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../assets/css/icon.scss';
// @mixin img{background:url(../assets/img.png) no-repeat; }
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
span{
  &.i1{
    position: relative;
    display: inline-block;
    @include img;
    @include print;
  }
}
i{
  &.i2{
    position: relative;
    display: inline-block;
    @include img;
    @include notebook; 
  }
}
</style>
