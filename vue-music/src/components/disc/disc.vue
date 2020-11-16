<template>
  <transition name="slide">
    <div class="disc">
    <musciList :rank='rank' :title='title' :bg-image='bgImage' :songs='songs' ></musciList>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import musciList from '../../components/music-list/music-list'
import {mapGetters} from 'vuex'
import {getSongList} from '../../api/recommend'
  import {creatSong} from '../../common/js/song'


  export default {
    data(){
      return{
        songs:[],
        rank:true
      }
    },
    created(){
      this.toGetSongList()
    },
    computed:{
      title(){
        return this.disc.dissname
      },
      bgImage(){
        return this.disc.imgurl
      }, 
      ...mapGetters([
        'disc'
      ])
    },
    components: {
      musciList
    },
    methods:{
      toGetSongList(){
        if (!this.disc.dissid) {
          this.$router.push('/recommend')
          return
        }
        getSongList(this.disc.dissid).then(res=>{
          if(res.code===0){
            this.songs = this.normalizeSongs(res.cdlist[0].songlist)
            }
        })
      },
      normalizeSongs(list) {
        let ret = []
        list.forEach((musicData) => {
          if (musicData.songid && musicData.albummid) {
            ret.push(creatSong(musicData))
          }
        })
        return ret
      }
    }
  }
</script>

<style scoped>
  .disc{
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #222;
  }
  .slide-enter-active, .slide-leave-active{
    transition: all 0.3s;

  }

  .slide-enter, .slide-leave-to{
    transform: translate3d(100%, 0, 0)

  }
</style>