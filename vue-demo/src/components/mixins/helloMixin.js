export const helloMixin = {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {}
  },
  methods: {
    sayHello () {
      // console.log('hello' + this.msg)
    },
    getData () {
      var fun = new Promise((resolve) => {
        let data = 'I am here'
        setTimeout(() => {
          resolve(data)
        }, 1000)
      })
      return fun
    }
  },
  mounted () {
    this.getData().then(v => {
      // console.log(v)
    })
  }
}
