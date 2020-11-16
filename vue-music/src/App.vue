<template>
  <div id="app">
    <header-top></header-top>
    <tab></tab>
    <router-view></router-view>
  </div>
</template>


<script>
  import headerTop from "../src/components/Header/header"
  import tab from "../src/components/tab/tab"
  export default{
  components:{
    headerTop,
    tab,
  }
  }
</script>

<style scoped>
*{
  margin: 0px;
  padding: 0px;
}
  #app{
    background-color: rgb(38,38,38);
    height: 100vh;
    width: 100%;
    overflow: hidden;
  }
</style>


