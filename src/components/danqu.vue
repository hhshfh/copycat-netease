<template>
  <div id="danqu">
    <div style="margin-top: 50px;"></div>
    <div v-for="(i, index) in songData" class="dq_i" v-on:click="_play(i.id)">
      <div class="asd">
        <div class="i_l">
          <img v-lazy="i.album.blurPicUrl" style="width: 60px" alt="">
        </div>
        <div class="i_r">
          <div style="font-size: 14px;color: black;">{{i.name}}</div>
          <div>
            <span v-for="x in i.artists">{{x.name}}</span>
          </div>
          <div>{{i.reason}}</div>
        </div>
      </div>
      <div style="margin-right: 15px;margin-top: 20px;">
        <van-icon name="more-o" v-on:click.stop="showhide(i.id, i.artists)"/>
      </div>
    </div>
    <mt-actionsheet :actions="actions" v-model="show">
    </mt-actionsheet>
  </div>
</template>
<script>
  export default {
    name:'danqu',
    data: () => ({
      songData:[],
      actions: [],
      show:false
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
      this.axios.get(this.HOST+`/recommend/songs`).then((res)=>{
        console.log(res.data)
        this.songData=res.data.recommend
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
      _play(id){
        let idarr=[];//只有歌曲id的数组
        for(let i=0,len=this.songData.length;i<len;i++){
          idarr.push(this.songData[i].id)
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
  .dq_i {
    display: flex;
    justify-content: space-between;
    padding: 5px;
    margin-bottom:8px;
    box-shadow: 0 0 30px #ccc inset;
  }
  .asd {
    display: flex;
    justify-content: flex-start;
  }
  .i_l {
    height:60px;
    overflow: hidden;
  }
  .i_r {
    margin-left:15px;
    font-size: 12px;
    color: grey;
    width:75%;
  }
</style>
