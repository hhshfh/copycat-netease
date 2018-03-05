<template>
  <div id="home">
    <!--<mynav></mynav>-->
    <mt-loadmore :top-method="loadTop" :topDistance="70" :maxDistance="100">
    <h2 style="color: white;margin-left: 10px;">你好！{{nickname}}</h2>
    <img :src="avatar" alt="hhh" class="avatar" style="margin-left: 10px;">

    <div class="devider">
      <img :src="background" alt="hhh" class="bg">
    </div>
    <!--<musiclist :listitem="play_listdata"></musiclist>-->
    <div class="listbg">
      <van-row>
        <div class="m_list" v-for="(i,index) in play_listdata">
          <router-link tag="div" :to="{path:'/songlist',query:{id:i.id}}">
            <van-col span="4">
              <div class="listavatar">
                <img v-lazy="i.imgUrl" alt="" class="">
              </div>
            </van-col>
            <van-col span="16">
              <div class="name_count">
                <div style="font-size: 14px">{{i.name}}</div>
                <div style="color: #9e9e9b;font-size: 12px;margin-top: 8px;">{{i.count}}</div>
              </div>
            </van-col>
            <!--<van-col span="4">-->
              <!--<van-icon name="more-o"/>-->
            <!--</van-col>-->
          </router-link>
        </div>
      </van-row>
    </div>
    </mt-loadmore>
  </div>
</template>
<script>
  import mynav from '@/components/components/nav'
//  import musiclist from '@/components/components/musiclist'//多此一举，已弃用
  export default {
    name: "home",
    data: () => ({
      nickname: '',
      avatar: '',
      background: '',
      play_listdata:[]
    }),
    components: {
      mynav,
//      musiclist
    },
    methods: {
      loadTop(){
        console.log('loooad')
      }
    },
    mounted() {
      //本地存储 或 状态管理 两种方式传递参数
      let readParams = JSON.parse(localStorage.getItem('params'));
//      let readParams=JSON.parse(this.$store.state.params);
      this.nickname = readParams.profile.nickname;
      let _this = this;
      this.axios.all([
        this.axios.get(this.HOST + `/user/detail?uid=${readParams.profile.userId}`),
        this.axios.get(this.HOST + `/user/playlist?uid=${readParams.profile.userId}`),
      ]).then(this.axios.spread((userResp, playlist) => {
        console.log(playlist.data)
        this.$store.state.mylist=playlist.data.playlist;//把歌单数据复制到 状态中vuex
        localStorage.setItem('playlist' , JSON.stringify(playlist.data.playlist));
        // 上面两个请求都完成后，才执行这个回调方法
        _this.avatar = userResp.data.profile.avatarUrl;
        _this.background = userResp.data.profile.backgroundUrl;
//        console.log(userResp.data)
        for (let i=0,len=playlist.data.playlist.length;i<len;i++){
          _this.play_listdata.push({
            name:playlist.data.playlist[i].name,//歌单名字
            creator:playlist.data.playlist[i].creator,//创建者
            imgUrl:playlist.data.playlist[i].coverImgUrl,//歌单封面
            count:playlist.data.playlist[i].trackCount,//歌曲数量
            id:playlist.data.playlist[i].id//歌单id
          })
        }

      }));
      //this.$store.state.play_listdata=this.play_listdata;
    },
    computed: {}
  }
</script>
<style scoped>

  .avatar {
    width: 100px;
    border-radius: 50%;
  }
h2 {
  margin-top:60px;
}
  .bg {
    width: 100vw;
    /*position: fixed;*/
    /*top: -1%;*/
    /*left: 0;*/
    /*z-index: -1;*/
    filter: blur(5px);
    transform: scale(1.1);
  }

.devider {
  position: fixed;
  top:-1%;
  left: 0;
  z-index: -1;
  width:100vw;
  height: 50vh;
  overflow: hidden;
}

  .m_list {
    width: 92%;
    height: 55px;
    margin-bottom: 10px;
    padding: 5px 4%;
    border-bottom: 2px solid #ff462c;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .listavatar > img {
    width: 50px;
    border-radius: 60px;
  }

  .listbg {
    background: #fffffb;
    padding: 8px 0;
    color: #2b2b2b;
    /*display: flex;*/
    /*justify-content: center;*/
  }

  .name_count {
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .rw {
    width: 100vw;
    outline:1px solid grey;
    height:100vh;
  }
</style>
