<template>
  <div class="lazyL">
    <div :class="$style.imglist">
    <img v-lazy="require('../assets/images/1.jpg.jpg')" @load="load"/>
    <img v-lazy="require('../assets/images/jg.jpg')" />
    <img v-lazy="require('../assets/images/jiang.jpg')" />
    <img v-lazy="require('../assets/images/jiangg2.jpeg')" />
    <img v-lazy="require('../assets/images/1.jpg.jpg')" @load="load"/>
  </div>
  </div>
</template>

<script>
export default {
  name: 'lazyL',
  data () {
    return {
    }
  },
  methods: {
    load (e) {
      console.log(e.target.height)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style module>
.imglist{
  position: relative;
  display: flex;
  flex-direction: column;
}
.imglist>img{
  position: relative;
  width:200px;
}
</style>
