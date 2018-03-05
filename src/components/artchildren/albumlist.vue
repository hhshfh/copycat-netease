<template>
  <div id="albumlist">
    <div class="alistMain">
      <div class="albar">
        <van-icon name="arrow-left" v-on:click="backToAlum()"/>
        <span>{{albumData.description}}</span>
      </div>
      <div class="alname">{{albumData.name}}</div>
      <div class="alsongs">
        <div class="alitem" v-for="(i, index) in songs">
          <div>
            <div>{{i.name}}</div>
            <div>
              <span v-for="x in i.ar" style="color: grey;font-size: 12px;margin-right: 3px">{{x.name}}</span>
            </div>
          </div>
          <div>
            <van-icon name="play" v-on:click="_alplay(i.id)"/>&nbsp;
            <van-icon name="more-o" v-on:click="_showAc(i.id)"/>
          </div>
        </div>
      </div>
    </div>
    <mt-actionsheet :actions="actions" v-model="show">
    </mt-actionsheet>
    <mt-popup
      v-model="popupVisible"
      position="bottom">
      <div style="width: 100vw;height: 50vh;overflow: scroll">
        <div v-for="(i, index) in listData">
          <div class="mylist" v-on:click="addtoMylist(i.id,i.name)">
            <div style="margin-right: 10px;"><img :src="i.coverImgUrl" alt=""></div>
            <div>{{i.name}}</div>
          </div>

        </div>
      </div>
    </mt-popup>
  </div>
</template>
<script>
  export default {
    name:'albumlist',
    data: () => ({
      albumData:{},
      songs:[],
      actions:[],
      show:false,
      popupVisible:false
    }),
    mounted(){
      let id = this.$route.query.albumId;
      this.axios.get(this.HOST+`/album?id=${id}`).then((res)=>{
//        console.log(res.data)
        if(res.data.code===200){
          this.albumData=res.data.album;
          this.songs=res.data.songs;
        }
      });
      this.actions=[{
        name: '收藏到我喜欢的',
        method:this.addtoLike
      },{
        name: '收藏到歌单',
        method:this.addtoList
      },{
        name: '查看评论',
        method:this.toComment
      }];
    },
    methods:{
      _alplay(id){
        let idarr=[];//只有歌曲id的数组
        for(let i=0,len=this.songs.length;i<len;i++){
          idarr.push(this.songs[i].id)
        }
        this.$store.state.trackIds=idarr;//放入播放列队

        let _this=this;
        this.$store.state.nowId=id;
        this.axios.all([
          this.axios.get(this.HOST +  `/music/url?id=${id}`),
          this.axios.get(this.HOST + `/song/detail?ids=${id}`),
        ]).then(this.axios.spread((res, info) => {
          _this.$store.state.srcData=res.data.data[0];
          _this.$store.state.songInfo=info.data.songs[0];
        }));
        _this.$store.state.nowId=id;
        _this.$store.state.isplay=true;
      },


      _showAc(id) {//打开行动面板
        //0 添加歌单
        this.show = this.show ? false : true;
        this.$store.state.readyToDoId = id;//挂载选中歌曲的id
        //1 查看评论

        //2 歌手信息
        //3 专辑
      },
      addtoLike() {
        let _this = this;
        let id = this.$store.state.readyToDoId;
//        console.log(id)
        this.axios.all([
          this.axios.get(this.HOST + `/like?id=${id}`)
        ]).then(this.axios.spread((res) => {
          if (res.data.code === 200) {
            this.$toast('成功！');
          } else {
            this.$toast('吔屎啦你');
          }
        }))
      },
      addtoList() {//显示要添加到的歌单
        this.popupVisible = this.popupVisible ? false : true
      },
      addtoMylist(id,name){//执行 添加到指定歌单
        let musicid=this.$store.state.readyToDoId;
        let _this=this;
        this.axios.all([
          this.axios.get(this.HOST+`/playlist/tracks?op=add&pid=${id}&tracks=${musicid}`)
        ]).then(this.axios.spread((res)=>{
//          console.log(res.data)
          if(res.data.code===200){
            _this.popupVisible=false;
            _this.$toast('已收藏到'+name);
          }else{
            _this.$toast('吔？出错了');
          }
        }))
      },
      toComment() {//去评论页
        let path = `/comment?id=${this.$store.state.readyToDoId}`;
        this.$router.push({path: path});
      },
      backToAlum(){
        this.$store.state.backStep-=2;
        window.history.back();
      }
    },
    computed:{
      listData() {//获取到 我创建的歌单(用于收藏功能）
        let data = JSON.parse(localStorage.getItem('playlist'));
        let uid = JSON.parse(localStorage.getItem('params')).profile.userId;
//        let data = this.$store.state.mylist;//本地存储和vuex两种方式
//        let uid=this.$store.state.userId;
        let rel=[];
        for (let i = 0; i < data.length; i++) {
          let id = data[i].userId;
          if (id == uid) {
            rel.push(data[i])
          }
        }
        return rel;
      }
    }
  }
</script>
<style scpoed>
  .alistMain {
    background: white;
  }
  .albar {
    background: ghostwhite;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 5px;
  }
  .albar>span {
    display: inline-block;
    margin-left:15px;
    font-size: 12px;
    color: grey;
    word-break:break-all;
  }
  .albg>img {
    width:100%;
    filter: blur(8px);
    transform: scale(1.1);
  }
  .alname {
    font-size: 14px;
    background: ghostwhite;
    padding: 5px 0 5px 35px;
  }
  .alitem {
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
</style>
