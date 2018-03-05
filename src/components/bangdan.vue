<template>
  <div id="bangdan">
    <div class="header">
      <div class="h_l">
        <img :src="coverImgUrl" alt="" style="box-shadow: 3px 3px 6px rgba(52,52,52,.5)">
      </div>
      <div class="h_r">
        <div>{{listname}}</div>
      </div>
    </div>
    <img :src="coverImgUrl" alt="" class="bg1">
    <div class="main_bg">
      <div v-for="(i,index) in songlistData" class="song_list">
        <div class="left">
          <div>{{i.name}}</div>
          <div style="color: grey;font-size: 12px">
            <span style="margin-right: 3px;" v-for="x in i.ar">{{x.name}}</span>
          </div>
        </div>
        <div class="right">
          <!--<span v-on:click="_play(i.id)">播放</span>-->
          <van-icon name="play"  v-on:click="_play(i.id)"/>&nbsp;
          <van-icon name="more-o" v-on:click="showhide(i.id, i.ar)"/>
        </div>

      </div>
    </div>


    <mt-actionsheet :actions="actions" v-model="show">
    </mt-actionsheet>
  </div>
</template>
<script>
  export default {
    name:'bangdan',
    data: () => ({
      show:false,
      songlistData:[],
      coverImgUrl:'',
      listname:'',
      actions: [],
      trackIds:[]
    }),
    mounted(){
      this.actions=[{
        name: '歌手',
        method:this.toArt
      },{
        name: '专辑'
      },{
        name: '查看评论',
        method:this.toComment
      }];
      let type=this.$route.query.type;
      this.axios.get(this.HOST+`/top/list?idx=${type}`).then((res)=>{
        console.log(res.data)
        this.songlistData=res.data.playlist.tracks;
        this.coverImgUrl=res.data.playlist.coverImgUrl;
        this.listname=res.data.playlist.name;
        this.trackIds=res.data.playlist.trackIds;
      })
    },
    methods:{
      showhide(id, art){
        this.show=this.show?false:true;
        this.$store.state.readyToDoId=id;//选中歌曲的id
        this.$store.state.readyToDoArt=art[0].id;//目前只能看 这首歌的第一名歌手
      },
      toComment() {//去评论页
        let path = `/comment?id=${this.$store.state.readyToDoId}`;
        this.$router.push({path: path});
      },
      toArt(){//歌手页
        let path = `/art/${this.$store.state.readyToDoArt}`;
        this.$router.push({path: path});
      },
      loadMore(){
        this.disabled=true;
        let data = JSON.parse(localStorage.getItem('songlistData'));
        for(let i=0;i<5;i++){
          this.songlistData.push(data[i])
        }

      },
      _play(id){
        let idarr=[];//只有歌曲id的数组
        for(let i=0,len=this.trackIds.length;i<len;i++){
          idarr.push(this.trackIds[i].id)
        }
        this.$store.state.trackIds=idarr;//放入播放列队


        let _this=this;
        this.$store.state.nowId=id;
        this.axios.all([
          this.axios.get(this.HOST +  `/music/url?id=${id}`),
          this.axios.get(this.HOST + `/song/detail?ids=${id}`),
        ]).then(this.axios.spread((res, info) => {
          _this.$store.state.srcData=res.data.data[0];
          console.log(res.data)
          console.log('信息',info.data)//歌曲信息
          _this.$store.state.songInfo=info.data.songs[0];
        }));
        _this.$store.state.nowId=id;
        _this.$store.state.isplay=true;

      }
    }
  }
</script>
<style scpoed>
  .left {
    width:80%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .right {

  }
  .song_list {
    width:78vw;
    margin:10px 3vw;
    padding: 10px 8vw;
    background: ghostwhite;
    border-radius: 100px;
    box-shadow: 3px 3px 15px rgba(0,0,0,0.2);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .bg1 {
    width:100vw;
    position: fixed;
    top:0;
    left:0;
    z-index: -1;
    transform: scale(1.2);
    filter: blur(25px);
  }
  .header {
    margin:60px 3vw 0 3vw;
    display: flex;
    justify-content: flex-start;
    color: white;
  }

  .h_l>img {
    width:30vw;
    margin-right:20px;
  }
  .main_bg {
    background: white;
    padding-top:5px;
    margin-top:8px;
  }
</style>
