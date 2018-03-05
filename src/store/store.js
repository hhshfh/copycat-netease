import Vue  from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
    state:{
      userId:0, //当前登录的用户id
      params:{},
      srcData:{url:'     '},
      songInfo:{
        al:{picUrl:'http://p1.music.126.net/MaUx2Rx92sBuE_5n8KfTog==/528865094249209.jpg'},
        ar:[{name:''}],
        name:'',
        trackIds:[],//只有歌曲id的数组
        //nowId:0 //正在播放的歌曲id,有一个是多余的，待测试
      },
      trackIds:[],//播放列队(id)
      nowId:0, //正在播放的歌曲id
      barNames:{},
      playstate:'播放',
      goBack:'wap-nav',  //导航条左侧按钮变化
      commentId:0,       //评论用id
      play_listdata:[],  //用户歌单列表信息
      mylist:[],        //我创建的歌单
      readyToDoId:0,     //展开行动列表时，取到的歌曲id
      readyToDoArt:0,    //展开行动列表时，取到的歌手id
      readyToDoAl:0,     //展开行动列表时，取到歌曲所在专辑id
      isplay:false,     //playbar的播放状态
      art:{//歌手页的相关内容
        hotSongs:[]
      },
      backStep:1,      //进入歌手页时，保存路由步数，用于退出歌手页
    },
    mutations:{
      add(state,x){
        console.log(JSON.stringify(state.nowId))
        console.log(x)
      }
    }
})
