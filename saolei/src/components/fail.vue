<template>
  <div class="fail">
    <div class="box1">
      <div class="title"><p>游戏失败</p><img src="../assets/images/close.png" @click="close"></div>
      <div class="main">
        <p class="des">
          不好意思，您输了。下次走运！
        </p>
        <p class="data1">
          时间：{{data}}秒
        </p>
        <p class="data2">已完游戏：19</p>
        <p class="data3"><span>已胜游戏：0</span><span>百分比：0%</span></p>
        <div class="btn"><p>退出</p><p @click="close">再玩一局</p></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'fail',
  props: ['data'],
  methods: {
    close () {
      this.$emit('close', false)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.fail{
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
    max-width:40%;
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
      p.des{
        position: relative;
        text-align: center;
        font-size: 1.4rem;
        color:#5e9df3;
        font-weight: bold;
      }
      p.data1{
        position: relative;
        padding-left:0rem;
        margin-bottom:3rem;
        margin-top:2rem;
        color:#3787f5;
        font-size: 1.2rem;
      }
      p.data2{
        position: relative;
        padding-left:0rem;
        color:#3787f5;
        font-size: 1.2rem;
        margin-bottom:1rem;
      }
      p.data3{
        position: relative;
        padding-left:0rem;
        color:#3787f5;
        font-size: 1.2rem;
        margin-bottom:2rem;
        span{
          &:nth-child(1){
            margin-right:5rem;
          }
        }
      }
      .btn{
        position: relative;
        margin-bottom:2rem;
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
