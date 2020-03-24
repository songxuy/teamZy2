<template>
  <div class="img">
  </div>
</template>

<script>
import Viewer from 'viewerjs'
import 'viewerjs/dist/viewer.css'
export default {
  name: 'img',
  props: {
    list: Array
  },
  data () {
    return {
    }
  },
  methods: {
    getInfo () {
      // 发送ajax请求图片list
      // ...
      // this.imgList = res.data.list;

      // 重点：要在图片已经请求到再调用！！
      this.$nextTick(() => {
        this.initImageTools()
      })
    },
    initImageTools () {
      // 初始化 viewerjs
      const ViewerDom = document.getElementById('img')
      console.log(ViewerDom)
      this.viewer = new Viewer(ViewerDom, {
        url: 'data-original',
        toolbar: 0,
        keyboard: false
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style module>
</style>
