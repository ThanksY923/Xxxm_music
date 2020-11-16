<template>
  <div id="tab-bar">
    <router-link tag="div"  class="tab-item" to="/recommend">
      <span class="tab-link" @click="activeItem(1)">推荐</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/singer">
      <span class="tab-link" @click="activeItem(2)">歌手</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/rank">
      <span class="tab-link" @click="activeItem(3)">排行
      </span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/search">
      <span class="tab-link">搜索</span>
    </router-link>
  </div>
</template>

<script>
export default {
    name:"tabbar",
    data(){
      return{

      }
    },
    methods:{
      activeItem(index){
        switch (index) {
          case 1:
            
            break;
        
          default:
            break;
        }
      }
    }
}
</script>

<style scoped>
#tab-bar {
  display: flex;
  height: 0.55rem;
  line-height: 0.55rem;
  font-size: 0.8rem;
  margin-top: 0.25rem;
  padding-bottom: 0.5rem;
}
.tab-item{
  flex: 1;
  text-align: center;
}
.tab-link{
  padding-bottom:0.0625rem;
  color: white;
}
.router-link-active>.tab-link{
    color: orange;
    border-bottom: 2px solid orange
}

</style>
