<template>
<transition name="slide">
    <div class="singer-detail">
        <musciList :title='title' :bg-image='bgImage' :songs='songs' ></musciList>
    </div>
</transition>
</template>
<script>
import {mapGetters} from 'vuex'
import {getSingerDetail,aaa} from '../../api/singer'
import {creatSong} from '../../common/js/song'
import musciList from '../../components/music-list/music-list'

export default {
    components:{
        musciList
    },
    data(){
        return{
            songs:[]
        }
    },
    computed:{
        title(){
            return this.singer.name
        },
        bgImage(){
            return this.singer.avatar
        },
        ...mapGetters([
            'singer'
        ])
    },
    created(){
        this.toGetSingerDetail()
    },
    methods:{
        // 获取数据
        toGetSingerDetail(){
            if(!this.singer.id){
                this.$router.push('/singer')
            }
            getSingerDetail(this.singer.id).then(res=>{
                if(res.code===0){
                    this.songs=this.normalizeSongs(res.data.list)
                }
            })
        },
        // 处理数据
        normalizeSongs(list){
            let ret=[]
            list.forEach(item=>{
                let {musicData}=item
                if(musicData.songid&&musicData.albummid){
                    ret.push(creatSong(musicData))
                }
            })
            return ret
        }
    }
}
</script>
<style scoped>
    .singer-detail{
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
    transform: translate3d(100%, 0, 0);
    }
</style>