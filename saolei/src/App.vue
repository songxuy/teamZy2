<template>
  <div id="app">
    <div class="header">
      <div class="box">
        <div class="down">
          <span class="li">游戏(G)</span>
          <ul class="down_list">
            <li>新游戏</li>
            <li @click="openSum">统计信息</li>
            <li @click="openOpt">选项</li>
        </ul>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="main_content">
        <div class="line" v-for="(i, j) in row" :key="'1'+j">
          <i v-for="(m,n) in column" :key="'2'+n" @click="choose(j, n)" :class="['boom'+(data[j*column+n]&&data[j*column+n].booN),(data[j*column+n]&&data[j*column+n].isChoose)?'choose':'',(data[j*column+n]&&data[j*column+n].isBoom&&data[j*column+n].actBoom)?'actboom':'',(data[j*column+n]&&data[j*column+n].isBoom&&data[j*column+n].boom)?'boom':'']"></i>
        </div>
      </div>
      <div class="data">
        <div class="left_time">
          <img src="./assets/images/shizhong.png" />
          <p>{{time}}</p>
        </div>
        <div class="right_data">
          <p>{{zdNum}}</p>
          <img src="./assets/images/zhadan.png" />
        </div>
      </div>
    </div>
    <fail v-if="showFail" :data="time" @close="close"></fail>
    <options v-if="showOpt" @close="close1" @choose="chooseOpt"></options>
    <summarys v-if="showSum" @close="close2"></summarys>
    <div class="over" v-if="isOver"></div>
  </div>
</template>
<script>
// @ is an alias to /src
import $ from 'jquery'
import fail from './components/fail'
import options from './components/option'
import summarys from './components/summary'
import { mapGetters } from 'vuex'
export default {
  name: 'app',
  components: {
    fail,
    options,
    summarys
  },
  data () {
    return {
      row: 0, // 当前每排个数
      column: 0,
      data: [
      ], // 数据
      timer: null,
      time: 0,
      zdNum: 0, // 炸弹数量
      initNum: [], // 炸弹初始化的数量
      showFail: false,
      showOpt: false,
      showSum: false,
      isOver: false,
      isRuning: true
    }
  },
  computed: {
    ...mapGetters({
      getdata: 'getData'
    })
  },
  methods: {
    openSum () {
      this.showSum = true
    },
    chooseOpt () {
      this.showOpt = false
      this.row = this.getdata.row
      this.column = this.getdata.column
      this.zdNum = this.getdata.boomNum
      console.log(this.row, this.column)
      this.$nextTick(() => {
        this.init()
      })
    },
    openOpt () {
      this.showOpt = true
    },
    close (value) {
      this.isOver = false
      this.showFail = value
      this.time = 0
      this.data = []
      this.init()
    },
    close1 (value) {
      this.showOpt = value
    },
    close2 (value) {
      this.showSum = value
    },
    getBoomNumAround (index) {
      let arr = []
      if (index - 9 > 0 && (index - 9) % 9 !== 0 && (index - 8) % 9 !== 0) {
        arr.push(index - 10)
        arr.push(index - 9)
        arr.push(index - 8)
      } else if (index - 9 >= 0 && (index - 9) % 9 === 0) {
        arr.push(index - 9)
        arr.push(index - 8)
      } else if (index - 9 > 0 && (index - 9) % 9 !== 0 && (index - 8) % 9 === 0) {
        arr.push(index - 10)
        arr.push(index - 9)
      }
      if (index % 9 !== 0 && (index + 1) % 9 !== 0) {
        arr.push(index - 1)
        arr.push(index + 1)
      } else if (index % 9 === 0) {
        arr.push(index + 1)
      } else if ((index + 1) % 9 === 0) {
        arr.push(index - 1)
      }
      if ((index + 9) < this.row * this.column && (index + 9) % 9 !== 0 && (index + 10) % 9 !== 0) {
        arr.push(index + 10)
        arr.push(index + 9)
        arr.push(index + 8)
      } else if ((index + 9) < this.row * this.column && (index + 9) % 9 === 0) {
        arr.push(index + 9)
        arr.push(index + 10)
      } else if ((index + 9) < this.row * this.column && (index + 9) % 9 !== 0 && (index + 10) % 9 === 0) {
        arr.push(index + 8)
        arr.push(index + 9)
      }
      console.log(arr)
      console.log(arr.filter(v => this.initNum.includes(v)))
      if (arr.filter(v => this.initNum.includes(v)).length === 0) {
        arr.forEach(item => {
          if (!this.data[item].isChoose) {
            this.isRuning = false
            console.log(this.isRuning)
            this.data[item].isChoose = true
            this.getBoomNumAround(item)
          }
        })
      } else {
        this.data[index].booN = arr.filter(v => this.initNum.includes(v)).length
      }
    },
    choose (i, j) {
      if (this.time === 0 && this.timer === null) {
        this.timing()
      }
      if (this.initNum.indexOf(i * this.column + j) === -1) {
        this.data[i * this.column + j].isChoose = true
        this.getBoomNumAround(i * this.column + j)
      } else {
        this.isOver = true
        this.data[i * this.column + j].isChoose = true
        this.data[i * this.column + j].actBoom = true
        this.initNum.splice(this.initNum.indexOf(i * this.column + j), 1)
        clearInterval(this.timer)
        this.timer = null
        var self = this
        let time = setInterval(function () {
          if (self.initNum.length > 0) {
            self.data[self.initNum[0]].boom = true
            self.data[self.initNum[0]].isChoose = true
            self.initNum.splice(0, 1)
          } else {
            self.showFail = true
            clearInterval(time)
          }
        }, 300)
      }
    },
    /* 初始化开始的数据 */
    init () {
      this.data = []
      for (let i = 0; i <= this.row * this.column - 1; i++) {
        this.data.push({ num: i, isChoose: false, boom: false, boomN: 0 })
      }
      while (this.initNum.length < this.zdNum) {
        let num = (Math.random() * this.data.length) >> 0
        if (this.initNum.indexOf(num) === -1) {
          this.initNum.push(num)
          this.data[num].isBoom = true
          this.data[num].actBoom = false
        }
      }
      console.log(this.data)
    },
    /* 开始计时 */
    timing () {
      var self = this
      this.timer = setInterval(function () {
        self.time++
        if (self.time >= 1000) {
          clearInterval(self.timer)
        }
      }, 1000)
    }
  },
  mounted () {
    this.row = this.getdata.row
    this.column = this.getdata.column
    this.zdNum = this.getdata.boomNum
    $('.down').hover(function () {
      $('.down_list').css({ display: 'block' })
      $('.down_list li').css({ height: '2rem' })
    }, function () {
      $('.down_list li').css({ height: '0rem' })
      $('.down_list').css({ display: 'none' })
    })
    this.$nextTick(() => {
      this.init()
    })
  }
}
</script>
<style lang="scss">
*{
  margin:0;
  padding:0;
}
html{
  font-size: 16px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #d4dde6;
  position: absolute;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.over{
  position: absolute;
  width:100%;
  height:100%;
  top:0;
  left:0;
}
.header{
  position: relative;
  width: 100%;
  background-color: #495cc3;
  height: 3rem;
  .box{
    position: relative;
    max-width: 1000px;
    margin: 0 auto;
    .down{
      span{
      position: relative;
      padding:0px 30px;
      line-height: 3rem;
      cursor: pointer;
      color: #fff;
      font-size: 1rem;
      display: inline-block;
      height:3rem;
      &:hover{
        background-color: #fff;
        color:#495cc3;
      }
    }
    ul.down_list{
      position: absolute;
      top:3rem;
      list-style: none;
      z-index:2;
      display: none;
      li{
        position: relative;
        padding:0px 30px;
        height: 0rem;
        line-height: 2rem;
        background-color: #495cc3;
        color:#fff;
        cursor: pointer;
        transition: all .3s ease-in-out;
        &:hover{
          background-color: #fff;
          color:#495cc3;
        }
      }
    }
  }
    }
}
.main{
  position: relative;
  width:100%;
  height:calc(100% - 3rem);
  .main_content{
    position: absolute;
    display: inline-block;
    left:50%;
    top:50%;
    transform: translate(-50%,-60%);
    .line{
      position: relative;
      display: inline-block;
      display: flex;
      i{
        position: relative;
        display: inline-block;
        height:3rem;
        width:3rem;
        background: url(./assets/images/0.png);
        background-size: 95% 95%;
        opacity: 0.7;
        cursor: pointer;
        &.choose{
          background: url(./assets/images/blank.png);
          background-size: 95% 95%;
        }
        &.actboom{
          background: url(./assets/images/red_boom.png);
          background-size: 95% 95%;
        }
        &.boom{
          background: url(./assets/images/boom.png);
          background-size: 95% 95%;
        }
        &.boom1{
          background: url(./assets/images/11.png);
          background-size: 95% 95%;
        }
        &.boom2{
          background: url(./assets/images/12.png);
          background-size: 95% 95%;
        }
        &.boom3{
          background: url(./assets/images/13.png);
          background-size: 95% 95%;
        }
        &.boom4{
          background: url(./assets/images/14.png);
          background-size: 95% 95%;
        }
        &.boom5{
          background: url(./assets/images/15.png);
          background-size: 95% 95%;
        }
        &.boom6{
          background: url(./assets/images/16.png);
          background-size: 95% 95%;
        }
        &.boom7{
          background: url(./assets/images/17.png);
          background-size: 95% 95%;
        }
        &.boom8{
          background: url(./assets/images/18.png);
          background-size: 95% 95%;
        }
        &:not(.choose):hover{
          opacity: 1;
        }
        @media only screen and (max-width: 600px){
          width:2.5rem;
          height:2.5rem;
        }
        @media only screen and (max-width: 400px){
          width:2rem;
          height:2rem;
        }
      }
    }
  }
  .data{
    position: absolute;
    bottom: 3rem;
    width: 35rem;
    left:50%;
    transform: translate(-50%,0);
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media only screen and (max-width: 600px){
      width:25rem;
    }
    @media only screen and (max-width: 400px){
      width:21rem;
    }
    .left_time{
      position: relative;
      display: flex;
      align-items: center;
      img{
        position: relative;
        width:5rem;
        height:5rem;
        @media only screen and (max-width: 600px){
          width:4rem;
          height:4rem
        }
        @media only screen and (max-width: 400px){
          width:3rem;
          height:3rem
        }
      }
      p{
        position: relative;
        height:3rem;
        line-height: 3rem;
        min-width:7rem;
        margin-left:1rem;
        text-align: center;
        background-color: #495cc3;
        color:#fff;
        border-radius: 5px;
        font-size: 18px;
        box-shadow: 2px 2px 5px #495cc3;
        @media only screen and (max-width: 600px){
          min-width:5rem;
          height:2.5rem;
          line-height: 2.5rem;
        }
        @media only screen and (max-width: 400px){
          min-width:4rem;
          height:2rem;
          line-height: 2rem;
        }
      }
    }
    .right_data{
      position: relative;
      display: flex;
      align-items: center;
      img{
        position: relative;
        width:6rem;
        height:6rem;
        @media only screen and (max-width: 600px){
          width:4rem;
          height:4rem
        }
        @media only screen and (max-width: 400px){
          width:3rem;
          height:3rem
        }
      }
      p{
        position: relative;
        height:3rem;
        line-height: 3rem;
        min-width:7rem;
        margin-right:1rem;
        text-align: center;
        background-color: #495cc3;
        color:#fff;
        border-radius: 5px;
        font-size: 18px;
        box-shadow: 2px 2px 5px #495cc3;
        @media only screen and (max-width: 600px){
          min-width:5rem;
          height:2.5rem;
          line-height: 2.5rem;
        }
        @media only screen and (max-width: 400px){
          min-width:4rem;
          height:2rem;
          line-height: 2rem;
        }
      }
    }
  }
}
</style>
