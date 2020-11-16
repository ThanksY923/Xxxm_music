<template>
    <div class="singer">
        <listview @select="selectSinger" :data='singers'></listview>
        <router-view></router-view>
    </div>
</template>
<script>
    import {getSingerList} from '../../api/singer'
    import Singer from '../../common/js/singer'
    import listview from '../../base/listview/listview'
    import scroll from '../../base/scroll/scroll'
    import {mapMutations} from 'vuex'

    const HOT_SINGER_LEN=10
    const HOT_NAME="热门"
export default {
    data(){
        return{
        singers:[]
        }
    },
    components:{
        listview
    },
    created(){
        this.toGetSingerList()
    },
    methods:{
        toGetSingerList(){
            getSingerList().then(res=>{
                if(res.code===0){
                    this.singers = this.normalizeSinger(res.data.list)
                }
            })
        },
        normalizeSinger(list){
            let map = {
            hot: {
                title: HOT_NAME,
                items: []
            }
            }
            list.forEach((item, index) => {
            if (index < HOT_SINGER_LEN) {
                map.hot.items.push(new Singer({
                name: item.Fsinger_name,
                id: item.Fsinger_mid
                }))
            }
            const key = item.Findex
            if (!map[key]) {
                map[key] = {
                title: key,
                items: []
                }
            }
            map[key].items.push(new Singer({
                name: item.Fsinger_name,
                id: item.Fsinger_mid
            }))
            })
            // 为了得到有序列表，我们需要处理 map
            let ret = []
            let hot = []
            for (let key in map) {
            let val = map[key]
            if (val.title.match(/[a-zA-Z]/)) {
                ret.push(val)
            } else if (val.title === HOT_NAME) {
                hot.push(val)
            }
            }
            ret.sort((a, b) => {
            return a.title.charCodeAt(0) - b.title.charCodeAt(0)
            })
            return hot.concat(ret)
        },
        selectSinger(singer){
            this.$router.push({
                path:'/singer/'+singer.id
            })
            this.setSinger(singer)
        },
        ...mapMutations({
            setSinger: 'SET_SINGER',
        })
    },
    
}
</script>
<style scoped>
    .singer{
    overflow: hidden;
    height: 100vh;
    }
</style>