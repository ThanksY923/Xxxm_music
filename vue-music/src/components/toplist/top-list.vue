<template>
<transition name="slide">
    <div class="list-detail">
        <musciList :rank="rank" :title='title' :bg-image='bgImage' :songs='songs'></musciList>
    </div>
</transition>
</template>
<script>
import musciList from '../../components/music-list/music-list'
import {mapGetters} from 'vuex'
import {getMusicList} from "../../api/rank"
import {creatSong} from "../../common/js/song"
export default {
    data(){
        return{
            songs:[],
            rank:true
        }
    },
    components:{
        musciList
    },
    created(){
        this.toGetMusicList();
    },
    computed:{
        title(){
            return this.topList.topTitle
        },
        bgImage(){
            if(this.songs.length){
                return this.songs[0].image
            }
        },
        ...mapGetters([
            'topList'
        ]),
    },
    methods:{
        toGetMusicList(){
            if(!this.topList.id){
                this.$router.push('/rank')
                return
            }
            getMusicList(this.topList.id).then(res=>{
                if(res.code===0){
                this.songs = this.normalizeSongs(res.songlist)
                }
            })
        },
        normalizeSongs(list) {
        let ret = []
        list.forEach((item) => {
        const musicData = item.data
        if (musicData.songid && musicData.albummid) {
            ret.push(creatSong(musicData))
        }
        })
        return ret
    },
    }
}
</script>
<style scoped>
.slide-enter-active,.slide-leave-active{
    transition: all 0.3s ease;
}

.slide-enter, .slide-leave-to{
    transform: translate3d(100%, 0, 0);
}
    .list-detail{
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #222;
    }
</style>