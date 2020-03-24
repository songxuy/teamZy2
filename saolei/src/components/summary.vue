<template>
  <div class="summary">
    <div class="box1">
      <div class="title"><p>扫雷统计信息</p><img src="../assets/images/close.png" @click="close"></div>
      <div class="main">
        <div class="main_content1">
          <div class="left">
            <p :class="showtab==1?'active':''" @click="changeTab(1)">初级</p>
            <p :class="showtab==2?'active':''" @click="changeTab(2)">中级</p>
            <p :class="showtab==3?'active':''" @click="changeTab(3)">高级</p>
          </div>
          <div class="middle">
            <fieldset>
              <legend>最佳时间</legend>
              <p><span>169s</span><span>2019-05-30 14:24:45</span></p>
              <p><span>169s</span><span>2019-05-30 14:24:45</span></p>
            </fieldset>
          </div>
          <div class="right">
            <p>已完游戏：<span>0</span></p>
            <p>已胜游戏：<span>0</span></p>
            <p>获胜率：<span>0%</span></p>
            <p>最多连胜：<span>0</span></p>
            <p>最多连败：<span>0</span></p>
            <p>当前连局：<span>0</span></p>
          </div>
        </div>
        <div class="btn"><p @click="close">关闭</p><p>重置</p></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'summarys',
  props: ['data'],
  data () {
    return {
      showtab: 1
    }
  },
  methods: {
    changeTab (i) {
      this.showtab = i
    },
    close () {
      this.$emit('close', false)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.summary{
  position: absolute;
  width:100%;
  height:100%;
  background-color: rgba(0,0,0,.5);
  top:0;
  left:0;
  z-index:5;
  .box1{
    position: relative;
    top:50%;
    left:50%;
    max-width:60%;
    transform: translate(-50%,-50%);
    background-color: #fafafb;
    .title{
      position: relative;
      height:3rem;
      padding: 0 2rem;
      background-color: #fff;
      border-bottom:1px solid #eee;
      p{
        position: relative;
        display: inline-block;
        height:3rem;
        line-height: 3rem;
        color:#000;
        font-size: 1.4rem;
      }
      img{
        position: relative;
        width:2.5rem;
        height:2.5rem;
        cursor: pointer;
        float:right;
        margin-top:.25rem;
      }
    }
    .main{
      position: relative;
      padding:2rem;
      width:calc(100% - 4rem);
      .main_content1{
        position: relative;
        display:flex;
        .left{
          position: relative;
          width:25%;
          height:6rem;
          background-color: #fff;
          border:1px solid #000;
          p{
            position: relative;
            width:calc(100% - .5rem);
            line-height: 1.5rem;
            height:1.5rem;
            padding-left:.5rem;
            cursor: pointer;
            &:hover{
              background-color: #3399ff;
              color:#fff;
            }
            &.active{
              background-color: #3399ff;
              color:#fff;
            }
          }
        }
        .middle{
          position: relative;
          margin-left:2.5%;
          width:35%;
          height:12rem;
          fieldset{
            position: relative;
            border: 1px solid #ddd;
            height:100%;
            overflow-y: scroll;
          }
          p{
            position: relative;
            padding:.5rem .5rem;
            span{
              position: relative;
              font-size: 1rem;
              &:nth-child(1){
                margin-right:1rem;
              }
            }
          }
        }
        .right{
          position: relative;
          width:37.5%;
          margin-left:5%;
          p{
            position: relative;
            margin-top:.5rem;
            padding-left:.5rem;
            span{
              position: relative;
              margin-left:2rem;
            }
          }
        }
      }
      .btn{
        position: relative;
        margin-top:2rem;
        display: flex;
        justify-content: space-around;
        p{
          position: relative;
          display: inline-block;
          width:8rem;
          height:2.5rem;
          text-align: center;
          cursor: pointer;
          border-radius: 5px;
          line-height: 2.5rem;
          &:nth-child(1){
            background-color: #e9686b;
            color:#fff;
            box-shadow: 3px 3px 3px #e9686b;
            margin-left:2rem;
          }
          &:nth-child(2){
            background-color: #5e9df3;
            color:#fff;
            box-shadow: 3px 3px 3px #5e9df3;
            right:4rem;
            &:hover{
              background-color: #3787f5;
            }
          }
        }
      }
    }
  }
}
</style>
