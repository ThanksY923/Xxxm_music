<template>
    <div class="search">
        <div class="search-box-wrapper">
            <search-box ref="searchBox" @query='onQueryChanges'></search-box>
        </div>
        <div class="shortcut-wrapper" v-show="!query">
            <div class="shortcut">
                <div class="hot-key">
                    <h1 class="title">热门搜索</h1>
                    <ul class="YY">
                        <li @click="addQuery(item.k)" class="item" v-for="(item,index) in hotKey" :key="index">
                            <span>{{item.k}}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div> 
        <div class="search-result" v-show="query">
            <suggest :query="query"  ></suggest>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
import SearchBox from '../../base/search-box/search-box';
import {getHotKey} from '../../api/search';
import suggest from '../../components/suggest/suggest'

export default {
    data(){
        return{
            hotKey:[],
            query:''
        }
    },
    components:{
        SearchBox,
        suggest
    },
    created(){
        this.toGetHotKey();
    },
    methods:{
        toGetHotKey(){
            getHotKey().then(res=>{
                if(res.code===0){
                this.hotKey=res.data.hotkey.slice(0,10)
                }
            })
        },
        addQuery(query){
            this.$refs.searchBox.setQuery(query)
        },
        onQueryChanges(query){
            this.query=query
        }
    }
}
</script>
<style scoped>
    .search-box-wrapper{
    margin: 20px;

    }
    .shortcut-wrapper{
    position: fixed;
    top: 120px;
    bottom: 0;
    width: 100%;
    }

    .shortcut{
        height: 100%;
        overflow: hidden;
    }

    .hot-key{
        margin: 0 20px 20px 20px;

    }
    .title{
        margin-bottom: 20px;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.5);
    }

    .item{
        display: inline-block;
        padding: 5px 10px;
        margin: 0 20px 10px 0;
        border-radius: 6px;
        background: #333;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.3);
    }

    .search-history{
        position: relative;
        margin: 0 20px;
    }

    .title{
        display: flex;
        align-items: center;
        height: 40px;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.5);
    }

    .text{
        flex: 1;
    }
    .clear{
        position: relative
    }
    .clear::before{
        content: '';
        position: absolute;
        top: -10px;
        left: -10px;
        right: -10px;
        bottom: -10px;
    }

    .icon-clear{
        font-size: 14px;
        color:rgba(255, 255, 255, 0.3);
    }

    .search-result{
        position: fixed;
        width: 100%;
        top: 178px;
        bottom: 0;
    }
    .YY{
        padding-inline-start: 0px;
        margin-top: -13px;
    }
</style>