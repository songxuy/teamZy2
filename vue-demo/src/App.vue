<template>
  <div id="app">
    <textArea @value="value1"></textArea>
    <h2>{{value}}</h2>
    <helloworld :msg="answer"></helloworld>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <input id="upload" type="file" @change="fileChange" multiple/>
    <!-- <video id="video" muted controls v-show="this.src!=''"></video> -->
    <!-- <div :class="$style.list" v-if="src.length>0">
      <img :src="item" alt="" id="img" v-for="(item, index) in src" :key="index">
    </div>
    <p>{{now()}}</p>
    <p>
    Ask a yes/no question:
    <input v-model="question">
  </p>
  <p>{{ answer }}</p>
  <lazyL></lazyL> -->
  <!-- <viewer :class="$style.loadData" id="img" :images="src1" @inited="inited" ref="viewer">
    <div v-for="(item, index) in src1" :key="index+10" :style="{position: 'relative', width: '200px', height: '200px',backgroundImage:`url(${require('./assets/images/'+item)})`,backgroundSize: 'cover'}" @click="show(index)"></div>
    <img :src="require('./assets/images/'+item)" alt="" id="img" v-for="(item, index) in src1" :key="index+20" style="display: none;">
    <div v-for="(item, index) in src1" :key="index+10"><img :src="require('./assets/images/'+item)" alt="" id="img" > </div>
  </viewer> -->
  <!-- <p v-if="isLoading">加载中。。。</p>
  <div :class="$style.imgloader">
    <img src="../src/assets/images/1.jpg.jpg"/>
  </div> -->
    <router-view/>
  </div>
</template>

<script>
import _ from 'loadsh'
import axios from 'axios'
import helloworld from '@/components/HelloWorld'
import textArea from '@/components/textArea'
/* import lazyL from '@/components/lazyL' */
import imgLoader from '@/assets/scripts/imgLoader.js'
export default {
  name: 'app',
  components: {
    helloworld,
    textArea/* ,
    lazyL */
  },
  data () {
    return {
      question: '',
      answer: 'I cannot give you an answer until you ask a question!',
      src: [
      ],
      value: '',
      poster: '',
      isLoading: false,
      src1: [
        'jianggu.jpeg',
        'jiang.jpg',
        'jiangg2.jpeg'
      ],
      viewer: null
    }
  },
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    question: function (newQuestion, oldQuestion) {
      this.answer = 'Waiting for you to stop typing...'
      this.debouncedGetAnswer()
    }
  },
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    next(vm => {
      console.log('beforeRouteEnter')
      console.log(vm.isLoading)
    })
  },
  created: function () {
    console.log('created')
    // `_.debounce` 是一个通过 Lodash 限制操作频率的函数。
    // 在这个例子中，我们希望限制访问 yesno.wtf/api 的频率
    // AJAX 请求直到用户输入完毕才会发出。想要了解更多关于
    // `_.debounce` 函数 (及其近亲 `_.throttle`) 的知识，
    // 请参考：https://lodash.com/docs#debounce
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 1000)
    imgLoader({
      limit: 5, // 多少张图片同时加载
      Process: (num) => {
        // this.processNum = num
        if (num === 100) {
          /* setTimeout(() => {
            this.$router.replace('/home')
          }, 100) */
          console.log('ok')
        }
      }
    })
    /* document.dispatchEvent(new Event('render-event')) */
  },
  mounted () {
    console.log('mounted')
    window.addEventListener('scroll', this.getData, true)
  },
  destroyed () {
    this.viewer = null
    window.removeEventListener('scroll', this.getData, true)
  },
  methods: {
    inited (viewer) {
      this.$viewer = viewer
    },
    show (i) {
      this.$viewer.view(i)
    },
    getScrollTop () {
      var scrollTop = 0; var bodyScrollTop = 0; var documentScrollTop = 0
      if (document.body) {
        bodyScrollTop = document.body.scrollTop
      }
      if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop
      }
      scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop
      return scrollTop
    },
    // 文档的总高度
    getScrollHeight () {
      var scrollHeight = 0; var bodyScrollHeight = 0; var documentScrollHeight = 0
      if (document.body) {
        bodyScrollHeight = document.body.scrollHeight
      }
      if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight
      }
      scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight
      return scrollHeight
    },
    getWindowHeight () {
      var windowHeight = 0
      if (document.compatMode === 'CSS1Compat') {
        windowHeight = document.documentElement.clientHeight
      } else {
        windowHeight = document.body.clientHeight
      }
      return windowHeight
    },
    getData () {
      console.log(this.getScrollTop() + ' ' + this.getWindowHeight() + ' ' + this.getScrollHeight())
      if (this.getScrollTop() + this.getWindowHeight() === this.getScrollHeight()) {
        this.isLoading = true
        setTimeout(() => {

        })
      }
    },
    value1 (data) {
      this.value = data
    },
    fileChange (el) {
      if (!el.target.files[0].size) return
      this.fileList(el.target.files) // 获取files文件组传入处理
      el.target.value = '' // 清空val值，以便可以重复添加一张图片
      /* const file = el.target.files[0] // File对象
      const src = URL.createObjectURL(file)
      this.src = src */
      // var _self = this
      /* this.$nextTick(() => {
        let video = document.getElementById('video')
        let source = document.createElement('source')
        source.src = src
        source.type = 'video/mp4'
        console.log(video)
        video.appendChild(source)
        video.addEventListener('loadeddata', function () {
          var canvas = document.createElement('canvas')
          canvas.width = '400'
          canvas.height = '400'
          canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height)
          let img = document.getElementById('img')
          img.src = canvas.toDataURL('image/png')
        })
      }) */
    },
    fileList (files) {
      for (let i = 0; i < files.length; i++) {
        if (['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].indexOf(files[i].type) !== -1) {
          this.fileAdd(files[i])
        } else {
          alert('请上传格式正确的图片')
        }
      }
    },
    fileAdd (file) {
      this.src.push(URL.createObjectURL(file))
    },
    now () {
      return _.now()
    },
    getAnswer: function () {
      if (this.question.indexOf('?') === -1) {
        this.answer = 'Questions usually contain a question mark. ;-)'
        return
      }
      this.answer = 'Thinking...'
      var vm = this
      axios.get('https://yesno.wtf/api')
        .then(function (response) {
          vm.answer = _.capitalize(response.data.answer)
        })
        .catch(function (error) {
          vm.answer = 'Error! Could not reach the API. ' + error
        })
    }
  }
}
</script>
<style lang="scss" module>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
h2{
  white-space: pre-wrap;
}
video{
  width:500px;
}
.list{
  position: relative;
  display: flex;
}
.list>img{
  width:200px;
  height:200px;
}
.loadData{
  position: relative;
  display: flex;
  flex-direction: column;
  img{
    width:200px;
    height:200px;
  }
}
.imgloader{
  position: relative;
  width:100%;
  display: inline-block;
  max-height:100px;
  line-height: 100px;
  overflow: hidden;
  img{
    display: block;
    width:100%;
    top:200px;
  }
}
</style>
