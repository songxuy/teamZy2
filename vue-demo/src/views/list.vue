<template>
  <div>
  <p v-for="(item, index) in list" :key="index">
    Line:
    <span v-text="item"></span>
  </p>
  <infinite-loading @infinite="infiniteHandler">
    <div slot="spinner">Loading...</div>
  <div slot="no-more">No more message</div>
  <div slot="no-results">No results message</div>
  </infinite-loading>
</div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'

export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    infiniteHandler ($state) {
      setTimeout(() => {
        const temp = []
        for (let i = this.list.length + 1; i <= this.list.length + 20; i++) {
          temp.push(i)
        }
        this.list = this.list.concat(temp)
        $state.loaded()
      }, 1000)
    }
  },
  components: {
    InfiniteLoading
  }
}
</script>
