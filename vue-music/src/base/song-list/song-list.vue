<template>
  <div class="song-list">
    <ul class="ulClass">
      <li @click="selectItem(song, index)" class="item" :key="index" v-for="(song, index) in songs">
        <div class="rank" v-show="rank">
          <span :class="getRankCls(index)">{{getRankText(index)}}</span>
        </div>
        <div class="content">
          <h2 class="name">{{song.name}}</h2>
          <p class="desc">{{getDesc(song)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      songs: {
        type: Array,
        default: []
      },
      rank: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      selectItem(item, index) {
        this.$emit('select', item, index)
      },
      getDesc(song) {
        return `${song.singer}·${song.album}`
      },
      getRankCls(index) {
        if (index <= 2) {
          return `icon icon${index}`
        } else {
          return 'text'
        }
      },
      getRankText(index) {
        if (index > 2) {
          return index + 1
        }
      }
    }
  }
</script>

<style scoped>
    .song-list{
      position: relative;
      width: 100%;
      background-color: rgb(34,34,34);
      z-index: 100;
    }
    .item{
      display: flex;
      align-items: center;
      box-sizing: border-box;
      height: 64px;
      font-size: 0.175rem;
    }

      .rank{
        flex: 0 0 25px;
        width: 25px;
        margin-right: 30px;
        text-align: center;
      }
      .ulClass{
        z-index: 50;
              width: 100%;
      background-color: rgb(34,34,34);
      }
        .icon{
          display: inline-block;
          width: 25px;
          height: 24px;
          background-size: 25px 24px;
        }
        .icon:nth-child(1){
            background-image: url('./first@2x.png');
        }
        .icon:nth-child(2){
            background-image: url('./second@2x.png');
        }
        .icon:nth-child(3){
            background-image: url('./third@2x.png');
        }

        .text{
          color: #ffcd32;
          font-size:0.225rem
        }

      .content{
        flex: 1;
        line-height: 20px;
        overflow: hidden;
        z-index: 50;
      }

        .name{
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            color:#fff;
        }

        .desc{
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          margin-top: 4px;
          color: rgba(255, 255, 255, 0.3);
        }

</style>