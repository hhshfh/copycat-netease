<template>
  <div id="song">
    <div v-for="(i, index) in songData" class="song_list">
      <div style="width: 85%">
        <div class="songname">{{i.name}}</div>
        <div class="arnames">
          <span v-for="x in i.ar">{{x.name}}</span>
        </div>
      </div>
      <div>
        <van-icon name="play" v-on:click="_play(i.id)"/>&nbsp;
        <van-icon name="more-o" v-on:click="_showAc(i.id)"/>
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
    name:'song',
    data: () => ({
      show:false,
      actions:[],
      popupVisible:false
    }),
    mounted(){
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
      _play(id){
        let arr=this.$store.state.art.hotSongs;
        let idarr=[];//只有歌曲id的数组
        for(let i=0,len=arr.length;i<len;i++){
          idarr.push(arr[i].id)
        }
        this.$store.state.trackIds=idarr;//放入播放列队


        let _this=this;
        this.$store.state.nowId=id;
//        console.log(this.$store.state.nowId)
        this.axios.all([
          this.axios.get(this.HOST +  `/music/url?id=${id}`),
          this.axios.get(this.HOST + `/song/detail?ids=${id}`),
        ]).then(this.axios.spread((res, info) => {
          _this.$store.state.srcData=res.data.data[0];
//          console.log(res.data)
//          console.log('信息',info.data)//歌曲信息
          _this.$store.state.songInfo=info.data.songs[0];
          let idarr=[];
          for(let i=0,len=_this.$store.state.art.hotSongs.length;i<len;i++){
            idarr.push(_this.$store.state.art.hotSongs[i].id)
          }
          _this.$store.state.trackIds=idarr;
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
      }
    },
    computed:{
      songData(){
        return this.$store.state.art.hotSongs;
      },
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
  #song {
    background: white;
    padding: 1px 0 0 0;
  }
  .songname{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .arnames{
    color: grey;
    font-size: 12px;
    /*width:80%;*/
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
</style>
