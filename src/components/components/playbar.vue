<template>
  <div id="playbar">
    <div class="fixbar"></div>
    <div class="bar">
      <!--<p>{{_id}}</p>-->
      <div class="musicImg">
        <!--<router-link tag="img" :src="songImg" alt="" width="100%" :to="{path:'/comment?id='+thisId,query:{musicId:_id}}"></router-link>-->
        <img :src="songImg" alt="" width="100%" v-on:click="toComment()">

      </div>
      <div class="other">
        <audio :src="_src" autoplay id="_audio"  v-on:ended="_end()"></audio>
        <div class="odiv"><!---->
          <div>
            <div style="font-size: 14px">{{songname}}</div>
            <div style="font-size: 12px;color: grey;">{{artname}}</div>
          </div>
          <div style="display: flex;align-items: center;width: 20%;justify-content: space-between">
            <van-icon name="arrow-left" v-on:click="_prev()"/>
            <van-icon :name="playstate" v-on:click="isplay()"/>
            <van-icon name="arrow" v-on:click="_next()"/>
          </div>
        </div>

    </div>

  </div>
    <!--<div style="position: fixed;bottom: 0;z-index: 999">123-->
      <!---->
    <!--</div>-->

  </div>
</template>
<script>
  export default {
    name:'playbar',
    data: () => ({
      srcData:{},
//        play:true,
      isshow:false,
      loop:['单曲','顺序']
    }),
    mounted(){
//      this.srcData=this.$store.state.srcData
//      let _audio=document.getElementById('_audio')
//      setInterval(()=>{
//        let duration=_audio.duration;
//        let current=_audio.currentTime;
//        this.currentT=Math.floor(duration/current)
//        console.log(Math.floor(current/duration))
//      },500)
    },
    computed:{
      _src(){
        if(this.$store.state.srcData.url){
          return this.$store.state.srcData.url
        }else{
          this.$toast('资源么得了');
        }
//        return this.$store.state.srcData.url?this.$store.state.srcData.url:''
      },
//      _id(){
//        return this.$store.state
//      },
      songImg(){
        return this.$store.state.songInfo.al.picUrl?this.$store.state.songInfo.al.picUrl:'http://p1.music.126.net/MaUx2Rx92sBuE_5n8KfTog==/528865094249209.jpg';
      },
      artname(){
        return this.$store.state.songInfo.ar[0].name?this.$store.state.songInfo.ar[0].name:' ';
      },
      songname(){
        return this.$store.state.songInfo.name?this.$store.state.songInfo.name:'请选择歌曲';
      },
      playstate(){
        return this.$store.state.isplay?'pause':'play'
      }
    },
    methods:{
      isplay(){
        this.$store.commit('add',666);
        let _audio=document.getElementById('_audio');
        let state=this.$store.state.isplay;
        if(state){
          this.$store.state.isplay=false
          _audio.pause();
        }else{
          this.$store.state.isplay=true
          _audio.play();
        }
      },
      _end(){//单曲循环与顺序播放
        console.log('结束');
        let _this=this;
        this.$options.methods._next(_this);
//        let _audio=document.getElementById('_audio');
//        _audio.currentTime=0;
//        _audio.play();
      },
      _loop(){//切换循环方式
//        let looptype = localStorage.getItem('looptype')?localStorage.getItem('looptype'):1;
      },
      _prev(){
        let now = this.$store.state.nowId;
        let index;
        let _this=this;
        let trackIds=this.$store.state.trackIds;
        if(now==trackIds[0]){//如果正在播放的是第一首歌，就阻止上一曲功能
          this.$toast('到头了');
          return;
        }
        index=this.$store.state.trackIds.indexOf(now);
        let previndex=this.$store.state.trackIds[index-1];//previndex是id不是索引！
        this.axios.all([
          this.axios.get(this.HOST + `/music/url?id=${previndex}`),
          this.axios.get(this.HOST + `/song/detail?ids=${previndex}`)
        ]).then(this.axios.spread((resurl,info)=>{
          console.log(info.data)
          _this.$store.state.songInfo=info.data.songs[0];
          _this.$store.state.srcData.url=resurl.data.data[0].url;
          _this.$store.state.nowId=previndex;
          _this.$store.state.isplay=true;
          console.log(_this.$store.state.songInfo)
        }))
      },
      _next(__this){
        let _this=__this||this;
        let now = _this.$store.state.nowId;
        let index;

        let trackIds=_this.$store.state.trackIds;
        if(now==trackIds[trackIds.length-1]){//如果正在播放的是最后一首歌，就阻止下一曲功能
          _this.$toast('到底了');
          return;
        }
        index=_this.$store.state.trackIds.indexOf(now);//正播放的歌曲id在列队中的索引
        console.log('正在播放第',index+2,'个')
        let previndex=_this.$store.state.trackIds[index+1];
        console.log(_this.$store.state.trackIds)
        _this.axios.all([
          _this.axios.get(_this.HOST + `/music/url?id=${previndex}`),
          _this.axios.get(_this.HOST + `/song/detail?ids=${previndex}`)
        ]).then(_this.axios.spread((resurl,info)=>{
          console.log('resurl',resurl.data)
          console.log('info',info.data)
          _this.$store.state.songInfo=info.data.songs[0];
          _this.$store.state.srcData.url=resurl.data.data[0].url;
          _this.$store.state.nowId=previndex;
          _this.$store.state.isplay=true
        }))
      },
      toComment(){//去评论页
        let path = `/comment?id=${this.$store.state.nowId}`;
        this.$router.push({path:path});
      }
    }
  }
</script>
<style scpoed>
  .bar {
    width:100%;
    background: white;
    box-shadow: 0px 0px 10px rgba(0,0,0,0.2) inset;
    padding: 5px;
    position: fixed;
    bottom:0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    z-index: 99;
  }
  .musicImg {
    width: 50px;
    height: 50px;
    outline:1px solid gainsboro;
    border-radius: 3px;
    overflow: hidden;
  }
.musicImg>img {
  width: 50px;
}
  .other {
    margin-left:10px;
    width: 75%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .odiv {
    display: flex;
    justify-content: space-between;
  }
  .fixbar {
    height:60px;
  }
  .mt-progress {
    height:1px;
  }
</style>
