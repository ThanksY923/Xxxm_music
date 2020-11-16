<template>
  <scroll :data="result" 
  class="suggest" 
  :pullup="pullup" 
  :probetype="3" ref="Scroll"
  :pullupload="true" @scrollToEnd="searchMore">
    <ul class="suggest-list">
      <li @click="tonext(item)" class="suggest-item" v-for="(item,index) in result" :key="index">
        <div class="icon">
          <i :class="getItemClass(item)"></i>
        </div>
        <div class="name">
          <div class="text" v-html="getDisplatName(item)"></div>
        </div>
      </li>
    </ul>
    <div class="loding" v-show="hasMore">正在载入中.....</div>
  </scroll>
</template>

<script type="text/ecmascript-6">

const TYPE='singer'
const perpage = 20
import {search} from "../../api/search"
import {processSinger} from "../../common/js/song"
import {creatSong} from '../../common/js/song'
import scroll from '../../base/scroll/scroll'
import Singer from "../../common/js/singer"
import {mapMutations} from 'vuex'

  export default {
    data(){
      return{
        page:1,
        result:[],
        pullup:true,
        hasMore: true
      }
    },
    props:{
      query:{
        type:String,
        defauly:""
      },
      showSinger:{
        type:Boolean,
        default:true
      }

    },
    methods:{
      search(){
        this.page = 1
        this.hasMore = true
        this.$refs.Scroll.scrollTo(0,0)
        search(this.query,this.page,this.showSinger,perpage).then(res=>{
          if(res.code===0){
            this.result=this.getResult(res.data)
            this.checkMore(res.data)
          }
        })
      },
      getDisplatName(item){
        if (item.type === TYPE) {
          return item.singername
        } else {
          return `${item.name}-${item.singer}`
        }
      },
      getItemClass(item){
        if (item.type === TYPE) {
          return 'icon-mine'
        } else {
          return 'icon-music'
        }
      },
      getResult(data){
        let ret = []
        if (data.zhida && data.zhida.singerid) {
          ret.push({...data.zhida, ...{type: TYPE}})
        }
        if (data.song) {
          ret = ret.concat(this._normalizeSongs(data.song.list))
        }
        return ret
      },
        _normalizeSongs(list) {
        let ret = []
        list.forEach((musicData) => {
          if (musicData.songid && musicData.albummid) {
            ret.push(creatSong(musicData))
          }
        })
        return ret
      },
      // 下拉加载更多
      searchMore(){
        if(!this.hasMore){
          return
        }
        this.page++
          search(this.query,this.page,this.showSinger,perpage).then(res=>{
          if(res.code===0){
            this.result = this.result.concat(this.getResult(res.data))
            this.checkMore(res.data)
          }
        })
      },
      // 检查是否有更多条数据
      checkMore(data){
        const song = data.song
        if (!song.list.length || (song.curnum + song.curpage * perpage) > song.totalnum) {
          this.hasMore = false
        }
      },
      tonext(item){
          if(item.type===TYPE){
              const singer= new Singer({
                id:item.singermid,
                name:item.singername
              })
              this.$router.push({
                path:'/search/'+singer.id
              })
              this.setSinger(singer)
          }
      },
      ...mapMutations({
            setSinger: 'SET_SINGER',
      })
    },
    watch:{
      query(){
        this.search()
      }
    },
    components:{
      scroll
    }
  }
</script>

<style scoped>

  .suggest{
    height: 105%;
    overflow: hidden;
    margin-top: -50px;
    margin-left: -30px;
    padding-inline-start: 0px;
  }

    .suggest-list{
      padding: 0 30px;

    }
      .suggest-item{
        display: flex;
        align-items: center;
        padding-bottom: 20px;
      }

      .icon{
        flex: 0 0 30px;
        width: 30px;
      } 
      .name{
        flex: 1;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.3);
        overflow: hidden;
      }

        .text{
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
    .no-result-wrapper{
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
</style>