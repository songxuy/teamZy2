<template>
  <div class="option1">
    <div class="box1">
      <div class="title"><p>选项</p><img src="../assets/images/close.png" @click="close"></div>
      <div class="main">
        <fieldset>
          <legend>难度</legend>
          <form action="">
            <div class="left">
            <div class="left_item">
              <input name="type" type="radio" id="type1" :checked="type==1" value="1"/>
              <label for="type1" @click="choose('1')">
                <span>初级(B)</span>
                <span>10 个雷</span>
                <span>9 * 9平铺网格</span>
              </label>
              </div>
              <div class="left_item">
              <input name="type" type="radio" id="type2" :checked="type==2" value="2"/>
              <label for="type2" @click="choose('2')">
                <span>中级(I)</span>
                <span>40 个雷</span>
                <span>16 * 16平铺网格</span>
              </label>
              </div>
              <div class="left_item">
              <input name="type" type="radio" id="type3" :checked="type==3" value="3"/>
              <label for="type3" @click="choose('3')">
                <span>高级(V)</span>
                <span>99 个雷</span>
                <span>16 * 30平铺网格</span>
              </label>
              </div>
            </div>
            <div class="right">
              <input name="type" type="radio" id="type4" :checked="type==4" value="4"/>
              <label for="type4" @click="choose('4')">
                自定义(U)
              </label>
              <div :class="(type == 4||radio ==4)?'info':'info noact'">
                <div class="item">
                  <span>高度(9-24)(H):</span>
                  <input type="text" v-model="selfInp.row" :readonly="type!=4&&radio!=4"/>
                </div>
                <div class="item">
                  <span>宽度(9-30)(W):</span>
                  <input type="text" v-model="selfInp.column" :readonly="type!=4&&radio!=4"/>
                </div>
                <div class="item">
                  <span>雷数(10-668):</span>
                  <input type="text" v-model="selfInp.boomNum" :readonly="type!=4&&radio!=4"/>
                </div>
              </div>
            </div>
          </form>
        </fieldset>
        <div class="btn"><p @click="submit">确定</p><p @click="close">取消</p></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'option1',
  data () {
    return {
      radio: '',
      selfInp: {
        row: 9,
        column: 9,
        boomNum: 10
      }
    }
  },
  methods: {
    close () {
      this.$emit('close', false)
    },
    submit () {
      let obj = {}
      console.log(typeof this.radio)
      switch (this.radio) {
        case '1':
          obj.row = 9
          obj.column = 9
          obj.boomNum = 10
          obj.type = 1
          this.$store.commit('SETDATA', obj)
          break
        case '2':
          obj.row = 16
          obj.column = 16
          obj.boomNum = 40
          obj.type = 2
          this.$store.commit('SETDATA', obj)
          console.log(this.$store)
          break
        case '3':
          obj.row = 16
          obj.column = 30
          obj.boomNum = 99
          obj.type = 3
          this.$store.commit('SETDATA', obj)
          break
        case '4':
          if (parseInt(this.selfInp.row) >= 9 && parseInt(this.selfInp.row) <= 24 && parseInt(this.selfInp.column) >= 9 && parseInt(this.selfInp.column) <= 30 && parseInt(this.selfInp.boomNum) >= 10 && parseInt(this.selfInp.boomNum) <= 668) {
            this.selfInp.type = '4'
            this.$store.commit('SETDATA', this.selfInp)
          } else {
            alert('请输入范围内的数字~')
          }
          break
      }
      this.$emit('choose')
    },
    choose (i) {
      this.radio = i
    }
  },
  computed: {
    ...mapGetters({
      type: 'type'
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.option1{
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
    max-width:50%;
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
      fieldset{
        position: relative;
        border:1px solid #ddd;
        margin-bottom:2rem;
        form{
          display: flex;
          position: relative;
          .left{
          position: relative;
          width:50%;
          display: flex;
          flex-direction: column;
          .left_item{
            position: relative;
            padding:1rem;
            display: flex;
            align-items: center;
            input[type='radio'] + label::before{
              position: absolute;
              content: '';
              background-color: #fff;
              border:1px solid #c2c7cb;
              width:15px;
              height:15px;
              border-radius: 50%;
              float: left;
              margin-right:6px;
              top:50%;
              transform: translate(0,-50%);
            }
            input[type='radio']{
              position: absolute;
              clip: rect(0,0,0,0)
            }
            input[type='radio']:checked + label::before{
              background-color: #5e9df3;
              background-clip: content-box;
              padding:3px;
              width:9px;
              height:9px;
            }
            label{
              position: relative;
              margin-left:.5rem;
              span{
                display: block;
                position: relative;
                &:nth-child(1){
                  margin-left:1.64rem;
                }
                &:nth-child(2){
                  margin-left:1.6rem;
                }
                &:nth-child(3){
                  margin-left:1.6rem;
                }
              }
            }
          }
        }
        .right{
          width: 50%;
          padding-top:1rem;
          input[type='radio'] + label::before{
              position: relative;
              content: '';
              background-color: #fff;
              border:1px solid #c2c7cb;
              width:15px;
              height:15px;
              border-radius: 50%;
              float: left;
              margin-right:6px;
              margin-top:3px;
            }
            input[type='radio']{
              position: absolute;
              clip: rect(0,0,0,0)
            }
            input[type='radio']:checked + label::before{
              background-color: #5e9df3;
              background-clip: content-box;
              padding:3px;
              width:9px;
              height:9px;
            }
            .info{
              position: relative;
              padding:.5rem .5rem 1rem 1.5rem;
              .item{
                position: relative;
                display: flex;
                margin-top:1rem;
                span{
                  position: relative;
                  display: inline-block;
                  width:7rem;
                  font-size: .9rem;
                  margin-right:.5rem;
                  line-height: 1.5rem;
                }
                input{
                  position: relative;
                  width:calc(100% - 7.5rem);
                  height:1.5rem;
                  line-height: 1.5rem;
                  padding:4px 7px;
                  font-size: .9rem;
                  border:1px solid #dcdee2;
                  border-radius: 4px;
                  color:#515a6e;
                  background-color: #fff;
                  cursor: text;
                  &:hover{
                    border: 1px solid #2d8cf0;
                  }
                  &:focus{
                    border: 1px solid #2d8cf0;
                  }
                }
              }
            }
            .noact{
              .item{
                span{
                  color:#cdcdcd;
                }
              }
            }
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
