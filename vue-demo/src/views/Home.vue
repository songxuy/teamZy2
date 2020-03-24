<template>
  <div class="home">
    <draggable v-model="list2"
    @change="change"
    @start="start"
    @end="end"
    :move="move">
    <transition-group>
        <div v-for="element in list2" :key="element.name">
            {{element.name}}
        </div>
    </transition-group>
</draggable>
  </div>
</template>

<script>
// @ is an alias to /src
import draggable from 'vuedraggable'

export default {
  name: 'home',
  components: {
    draggable
  },
  data () {
    return {
      list2: [
        { id: '1', name: 'x' },
        { id: '1', name: 'y' },
        { id: '1', name: 'z' },
        { id: '1', name: 'a' },
        { id: '1', name: 'b' },
        { id: '1', name: 'c' },
        { id: '1', name: 'e' },
        { id: '1', name: 'd' },
        { id: '1', name: 'f' },
        { id: '1', name: 'g' },
        { id: '1', name: 'h' },
        { id: '1', name: 'i' },
        { id: '1', name: 'j' },
        { id: '1', name: 'k' }
      ]
    }
  },
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    next(vm => {
      console.log('beforeRouteEnter')
    })
  },
  created () {
    console.log('home created')
  },
  mounted () {
    console.log('home mounted')
  },
  methods: {
    change (evt) {
      console.log(evt)
    },
    // start ,end ,add,update, sort, remove 得到的都差不多
    start (evt) {
      console.log(evt)
    },
    end (evt) {
      console.log(evt)
      console.log(this.list2)
      // evt.item // 可以知道拖动的本身
      // evt.to // 可以知道拖动的目标列表
      // evt.from // 可以知道之前的列表
      // evt.oldIndex // 可以知道拖动前的位置
      // evt.newIndex // 可以知道拖动后的位置
    },
    move (evt, originalEvent) {
      console.log(evt)
      console.log(originalEvent) // 鼠标位置
    }
  }
}
</script>
