<template>
<div>
    <scroll :data="data" :probetype="3" :pullupload="true"
          class="listview"
          ref="listview">
    <ul class="uiclass">
      <li v-for="group in data" class="list-group" :key="group.title" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li v-for="item in group.items" @click="selectItem(item)"
          :key="item.name" class="list-group-item">
            <img class="avatar" :src="item.avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul> 
    <div v-show="!data.length" class="loading-container">
        <div class="loding" v-show="!data.length">正在载入中.....</div>
    </div>
  </scroll>
      <div class="list-shortcut">
        <ul>
          <li v-for="(item,index) in shortCutList" 
          @touchstart='onTouch'
          :key="index" :data-index="index" class="item">{{item}}</li>
        </ul>
      </div>
</div>

</template>

<script type="text/ecmascript-6">
  import scroll from '../../base/scroll/scroll'
  import {getData} from '../../common/js/dom'

  export default {
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    components:{
      scroll
    },
    computed: {
      shortCutList(){
        return this.data.map((group) => {
          return group.title.substr(0, 1)
        })
      }
    },
    created() {
      this.firstTouch={}
    },
    methods: {
      onTouch(e){
        let index =getData(e.target,'index')
        let touch=e.touches[0]
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index],0)
      },
      selectItem(item){
        this.$emit('select',item)
      }
    },
  }

</script>

<style scoped>
    *{
      list-style: none;

    }
  .listview{
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #222;
  }

    .list-group{
      padding-bottom: 30px;
    }
      .list-group-title{
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        font-size: 0.15rem;
        color: rgba(255, 255, 255, 0.5);
        background: #333;
      }


      .list-group-item{
        display: flex;
        align-items: center;
        padding: 20px 0 0 0px;
      }

        .avatar{
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }

        .name{
          margin-left: 20px;
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.175rem;
        }
    .list-shortcut{
      position: fixed;
      z-index: 30;
      left: 326px;
      width: 20px;
      border-radius: 10px;
      text-align: center;
      top: 120px;
      background: rgba(0, 0, 0, 0.3);
      font-family: Helvetica;
    }

      .item{
        position: relative;
        line-height: 20px;
        left: -33.5px;
        color: rgba(255, 255, 255, 0.5);
        font-size: 0.00225rem
      }

        .current-active{
          color: #ffcd32;
        }
    .list-fixed{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    }

      .fixed-title{
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        font-size: 0.15rem;
        color: rgba(255, 255, 255, 0.5);
        background: #333;
      }

    .loading-container{
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
    .loding{
    text-align: center;
    display: flex;
    justify-content: center;
    color: palegoldenrod;
    font-size: 0.15rem;
    }
    .listview{
    overflow: hidden;
    height: 90vh;
    margin-top: 20px;
    }
    .uiclass{
      padding-inline-start: 0px;
    }
</style>
