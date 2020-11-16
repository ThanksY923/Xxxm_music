<template>
    <div class="recommend" >
        <swiper class="swipertop">
                <swiperItem v-for="item in recommends" :key="item.id">
                    <a :href="item.linkUrl">
						<img :src="item.picUrl" >
					</a>
                </swiperItem>
        </swiper>
        <scroll class="home_hegit" :data='discList' ref='scroll' :probetype="3" :pullupload="true" 
        @pullingUp="loadmore">

            <div class="recommend-ltis">
                <h1 class="list-title">热门歌单推荐</h1>
                <ul>
                    <li @click="selectItem(item)" v-for="item in discList" class="item" :key="item.dissid">
                        <div class="icon">
                            <img :src="item.imgurl" @load="imgLode" width="60" height="60" alt="">
                        </div>
                        <div class="text">
                            <h2 class="name" v-html="item.creator.name"></h2>
                            <p class="desc" v-html="item.dissname"></p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="loding" v-show="!discList.length">正在载入中.....</div>
        </scroll>
        <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
    import {getRecommend,getDiscList} from '../../api/recommend'
    import swiper from '../../base/Swiper/Swiper'
    import swiperItem from '../../base/Swiper/SwiperItem'
    import scroll from '../../base/scroll/scroll'
    import {mapMutations} from 'vuex'

    export default {
        components:{
            swiper,
            swiperItem,
            scroll
        },
        data(){
            return{
                recommends:[],
                discList:[]
            }
        },
        created(){
            this._getRecommend()
            this.getList()
        },
        methods:{
            _getRecommend(){
                getRecommend().then(res=>{
                    if(res.code===0){
                        this.recommends=res.data.slider
                    }
                })
            },
            getList(){
                getDiscList().then(res=>{
                    if(res.code===0){
                    console.log(res.data.list)
                    this.discList=res.data.list
                    }
            })  
            },
            loadmore(){
                this._getRecommend()
            },
            imgLode(){
                this.$bus.$emit("recImageLode")
            },
            selectItem(item){
                this.$router.push({
                    path:`/recommend/${item.dissid}`
                })
                this.setDisc(item)
            },
            ...mapMutations({
                setDisc:'SET_DISC'
            })
        }
    }
</script>

<style scoped>
.recommend{
    overflow: hidden;
    height: 100vh;
    margin-top: 0.25rem;
}
.list-title{
    height: 0.8125rem;
    line-height: 0.8125rem;
    text-align: center;
    font-size: 14px;
    margin-top: 20px;
    color: #ffcd32;
}
.item{
    display: flex;
    box-sizing: border-box;
    align-items: center;
    padding: 0 20px 20px 20px;
}
.icon{
    flex: 0 0 60px;
    width: 60px;
    padding-right: 20px;
}
.text{
    display: flex;
    flex-direction: column;
    font-size: 14px;
    justify-content: center;
    flex: 1;
    line-height: 20px;
    overflow: hidden;
}
.name{
    font-size: 14px;
    color: white;
    opacity: .6;
}
.desc{
    font-size: 12px;
    color: white;
    opacity: .6;
}

.home_hegit{
    overflow: hidden;
    height: 70vh;
}
.loding{
    text-align: center;
    display: flex;
    justify-content: center;
    color: palegoldenrod;
    font-size: 0.15rem;
}
</style>  