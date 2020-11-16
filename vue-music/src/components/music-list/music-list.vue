<template>
    <div class="music-list">
        <img src="../../assets/return.png" @click="returnImage" class="returnImage" alt="">
        <div class="back">
            <i class="icon-back"></i>
        </div>
        <h1 class="title" v-html="title"></h1>
        <div class="bg-image" :style="bgstyle" ref="bgImageRef">

            <div class="filter"></div>
        </div>
        <div class="bg-layer" ref="layerRef"></div>
            <div class="play-wrapper">
            <div ref="playBtn" @click="aaa" v-show="songs.length>0" class="play">
            <i class="icon-play"></i>
            <span class="text">随机播放全部</span>
            </div>
        </div>
        <scroll @scroll="scroll" class="home_hegit" :probetype="probetype"  
        :listen-scroll="listenScroll" :pullupload="true" :data="songs" >
            <div class="songListWapper">
                <songlist :rank='rank' :songs="songs"></songlist>
            </div>
            <div class="loding" v-show="!songs.length">正在载入中.....</div>
        </scroll>
    </div>
</template>
<script>
import scroll from '../../base/scroll/scroll'
import songlist from '../../base/song-list/song-list'
import {prefixStyle} from '../../common/js/dom'

const transform = prefixStyle('transform')

const reserHeight=40


export default {
    created(){
        this.probetype=3
        this.listenScroll=true
    },
    mounted(){
        this.imageHeight=this.$refs.bgImageRef.clientHeight
        this.minTranslageY=-this.imageHeight+reserHeight
    },
    props:{
        bgImage:{
            type:String,
            default:''
        },
        songs:{
            type:Array,
            default:[]
        },
        title:{
            type:String,
            default:''
        },
        rank:{
            type:Boolean,
            default:false
        }
        
    },
    components:{
        songlist,
        scroll
    },
    computed:{
        bgstyle(){
            return 'background-image: url('+this.bgImage+')'
        }
    },
    methods:{
        returnImage(){
            this.$router.back()
        },
        scroll(pos){
            this.scrollY=pos.y
        },
        aaa(){
            console.log("asd")
        }
    },
    data(){
        return{
            scrollY
        }
    },
    watch:{
        scrollY(newY){
            let translateY=Math.max(this.minTranslageY,newY)
            this.$refs.layerRef.style[transform] = `translate3d(0,${translateY}px,0)`
        }
    }
}
</script>
<style scoped>
*{
    margin: 0px;
    padding: 0px;
}
    .music-list{
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        background-image: url();
        right: 0;
        bottom: 0;
        width: 100%;
        background: #222;
        height: 100vh;
    }
    .back{
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 50;
    }
    .icon-back{
        display: block;
        padding: 10px;
        font-size: 0.275rem;
        color:#ffcd32;
    }
    .title{
        position: absolute;
        top: 0;
        z-index: 150;
        width: 100%;
        height: 40px;
        background-color: black;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        text-align: center;
        line-height: 40px;
        font-size: 0.225rem;
        color: #ffffff;
    }
    .bg-image{
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 70%;
        transform-origin: top;
        background-size: cover;
    }
    .filter{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(7, 17, 27, 0.4);
    }
    .play-wrapper{
        position: absolute;
        width: 100%;
        top: 200px;
    }
    .play{
        box-sizing: border-box;
        width: 135px;
        padding: 7px 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid #ffcd32;
        color: #ffcd32;
        border-radius: 100px;
        font-size: 0;
    }
        .icon-play{
            display: inline-block;
            vertical-align: middle;
            margin-right: 6px;
            font-size: 16px
        }

        .text{
            display: inline-block;
            vertical-align: middle;
            font-size: 12px;
        }
        .home_hegit{
            height: 60vh;
        }
        .returnImage{
            position: absolute;
            top: 20px;
            left: 20px;
            width: 30px;
            z-index: 200;
        }
        .loding{
        text-align: center;
        display: flex;
        justify-content: center;
        color: palegoldenrod;
        font-size: 0.15rem;
        }
</style>