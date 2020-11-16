<template>
    <div class="rank">
        <scroll :data='topList' class="toplist" :probetype="3" :pullupload="true">
            <ul class="YYY">
                <li class="item"  v-for="(item,index) in topList" :key="index"
                @click="selectItem(item)">
                    <div class="icon">
                        <img width="100" height="100"  :src="item.picUrl">
                    </div>
                    <ul class="songlist">
                        <li class="song"  v-for="(song,index) in item.songList" :key="index">
                            <span>{{index+1}}</span>
                            <span>{{song.songname}}--{{song.singername}}</span>
                        </li>
                    </ul>
                </li>
            </ul>
            <div class="loding" v-show="!topList.length">正在载入中.....</div>
        </scroll>
        <router-view></router-view>
    </div>
</template>
<script>
import {getTopList} from "../../api/rank"
import scroll from '../../base/scroll/scroll'
import {mapMutations} from 'vuex'
export default {
    data(){
        return{
            topList:[]
        }
    },
    created(){
        this.toGetTopList()
    },
    methods:{
        toGetTopList(){

            getTopList().then(res=>{
                if(res.code===0){
                    this.topList=res.data.topList
                }
            })
        },
        selectItem(item){
            console.log(item)
            this.$router.push({
                path:'/rank/'+item.id
            })
            this.setTopList(item)
        },
        ...mapMutations({
            setTopList: 'SET_TOP_LIST'
        })
    },
    components:{
        scroll
    },
}
</script>
<style scoped>
.rank{
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
}

.toplist{
    height: 100%;
    overflow: hidden;
    margin-top: -20px;
}
.item{
        display: flex;
        margin: 0 20px;
        padding-top: 20px;
        height: 100px;
}
.item:last-child{
        padding-bottom: 20px;
}

.icon{
    flex: 0 0 100px;
    width: 100px;
    height: 100px;
}

    .songlist{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100px;
        overflow: hidden;
        background: #333;
        color: rgba(255, 255, 255, 0.3);
        font-size:12px;
        padding-inline-start: 0px;
    }

.song{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    line-height: 26px;
    }
.YYY{
    padding-inline-start: 0px;
}
.loding{
    text-align: center;
    display: flex;
    justify-content: center;
    color: palegoldenrod;
    font-size: 0.15rem;
}
</style>