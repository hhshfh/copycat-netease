import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'

Vue.use(Router)


let router = new Router({
  scrollBehavior(to, from, savePosition) {

    if (savePosition) {
      // console.log(savePosition,'有');
      return savePosition;
    } else {
      // console.log('没有')
      return {x:0,y:0}
    }
  },
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
      meta: {
        index: 0
      }
    },
    {
      path: '/home',
      name: 'home',
      component: resolve => {
        require(['@/components/home'], resolve)
      },
      meta: {
        index: 1
      }
    },
    {
      path: '/center',
      name: 'center',
      component: resolve => {
        require(['@/components/center'], resolve)
      },
      meta: {
        index: 1.1
      }
    },
    {
      path: '/tjgd',
      name: 'tjgd',//全部 推荐歌单（center下的）
      component: resolve => {
        require(['@/components/tjgd'], resolve)
      },
      meta: {
        index: 1.11
      }
    },
    {
      path: '/newalbum',
      name: 'newalbum',//全部 新碟上架（center下的）
      component: resolve => {
        require(['@/components/newalbum'], resolve)
      },
      meta: {
        index: 1.11
      }
    },
    {
      path: '/hotart',
      name: 'hotart',//全部 热门歌手（center下的）
      component: resolve => {
        require(['@/components/hotart'], resolve)
      },
      meta: {
        index: 1.11
      }
    },
    {
      path: '/album',
      name: 'album',//推荐歌单的内容页（center下的）
      component: resolve => {
        require(['@/components/album'], resolve)
      },
      meta: {
        index: 1.11
      }
    },
    {
      path: '/album_z',
      name: 'album_z',//新碟上架的内容页（center下的）
      component: resolve => {
        require(['@/components/album_z'], resolve)
      },
      meta: {
        index: 1.12
      }
    },
    {
      path: '/jingxuan',
      name: 'jingxuan',//精选歌单（center下的）
      component: resolve => {
        require(['@/components/jingxuan'], resolve)
      },
      meta: {
        index: 1.11
      }
    },
    {
      path: '/danqu',
      name: 'danqu',//单曲推荐（center下的）
      component: resolve => {
        require(['@/components/danqu'], resolve)
      },
      meta: {
        index: 1.11
      }
    },
    {
      path: '/paihang',
      name: 'paihang',//排行榜（center下的）
      component: resolve => {
        require(['@/components/paihang'], resolve)
      },
      meta: {
        index: 1.11
      }
    },
    {
      path: '/bangdan',
      name: 'bangdan',//排行榜（center下的）
      component: resolve => {
        require(['@/components/bangdan'], resolve)
      },
      meta: {
        index: 1.12
      }
    },
    {
      path: '/mine',
      name: 'mine',
      component: resolve => {
        require(['@/components/mine'], resolve)
      },
      meta: {
        index: 1.2
      }
    },
    {
      path: '/songlist',
      name: 'songlist',
      component: resolve => {
        require(['@/components/songlist'], resolve)
      },
      meta: {
        index: 2
      }
    },
    {
      path: '/comment',
      name: 'comment',
      component: resolve => {
        require(['@/components/comment'], resolve)
      },
      meta: {
        index: 999
      }
    },
    {
      path: '/search',
      name: 'search',
      component: resolve => {
        require(['@/components/search'], resolve)
      },
      meta: {
        index: 4 //搜索页
      }
    },
    {
      path: '/art/:id',
      name: 'art',
      redirect: '/art/:id/song',
      component:resolve=>{
        require(['@/components/art'],resolve)
      },
      // mode: 'history',
      children: [
        {
          path: 'song', component: resolve => {
          require(['@/components/artchildren/song'], resolve)
        },meta:{
            index:6
        }
        },
        {
          path: 'alum', component: resolve => {
            require(['@/components/artchildren/alum'], resolve)
          },meta:{
            index:7
          }
        },
        {
          path: 'albumlist', component: resolve => {//专辑内容
          require(['@/components/artchildren/albumlist'], resolve)
        },meta:{
          index:7.1
        }
        },
        {
          path: 'mv', component: resolve => {
          require(['@/components/artchildren/mv'], resolve)
        },meta:{
          index:8
        }
        },
        {
          path: 'info', component: resolve => {
          require(['@/components/artchildren/info'], resolve)
        },meta:{
          index:9
        }
        }
      ],
      meta: {
        index: 5 //歌手页
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  // console.log(to.meta.index)
  // console.log(from.meta.index)
  next()
})
export default router
