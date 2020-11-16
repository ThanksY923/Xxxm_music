import Vue from 'vue'
import VueRouter from 'vue-router'
import Recommend from "../components/recommend/recommend.vue"
import Singer from "../components/singer/singer.vue"
import Rank from "../components/rank/rank.vue"
import Search from "../components/search/search.vue"
import singerDetail from "../components/singer/singer-detail.vue"
import Disc from "../components/disc/disc.vue"
import TopList from "../components/toplist/top-list.vue"

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    redirect:'/recommend'
  },
  {
    path:'/recommend',
    component:Recommend,
    children:[
      {
        path:':id',
        component:Disc
      }
    ]
  },
  {
    path:'/singer',
    component:Singer,
    children:[
      {
        path:':id',
        component:singerDetail
      }
    ]
  },
  {
    path: '/rank',
    component: Rank,
    children:[
      {
        path:':id',
        component:TopList
      }
    ]
  },
  {
    path:'/search',
    component:Search,
    children:[
      {
        path:':id',
        component:singerDetail
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
export default router
