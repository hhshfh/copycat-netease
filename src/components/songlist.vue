<template id="asd">
  <div id="songlist">
    <div class="header">
      <div class="h_l">
        <img v-lazy="coverImgUrl" alt="" style="box-shadow: 3px 3px 6px rgba(52,52,52,.5)">
        <div style="width:100%;height: 250px;background: white;position: fixed;top: 258px;left: 0;z-index: -1;"></div>
      </div>
      <div class="h_r">
        <div>{{listname}}</div>
        <div class="creator">
          <img v-lazy="creator.avatarUrl" alt="">
          <div>By&nbsp;{{creator.nickname}}</div>
        </div>
      </div>
    </div>
    <img :src="coverImgUrl" alt="" class="bg1">
    <div class="bg2"></div>
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
          <van-icon name="play" v-on:click="_play(i.id)"/>&nbsp;
          <van-icon name="more-o" v-on:click="showhide(i.id, i.ar, i.al)"/>
        </div>

      </div>
    </div>
    <!--<van-actionsheet v-model="show" :actions="actions" />-->
    <mt-actionsheet :actions="actions" v-model="show">
    </mt-actionsheet>
  </div>
</template>
<script>
//  import IScroll from '../../static/iscroll.js'
  export default {
    name: 'songlist',
    data: () => ({
      disabled: false,
      show: false,
      songlistData: [],
      coverImgUrl: '',
      listname: '',
      actions: [],
      trackIds: [],
      creator: {},//创建者信息
    }),
    mounted() {
      this.actions = [{
        name: '歌手',
        method: this.toArt
      }, {
        name: '专辑',
        method: this._toAlbum
      }, {
        name: '查看评论',
        method: this.toComment
      }, {
        name: '从歌单中删除',
        method: this._delete
      }];
      let _this = this;
      this.axios.all([
        this.axios.get(this.HOST + `/playlist/detail?id=${this.$route.query.id}`)
      ]).then(this.axios.spread((songlistData) => {
        console.log(songlistData.data)
        localStorage.setItem('songlistData', JSON.stringify(songlistData.data));
        _this.songlistData = songlistData.data.playlist.tracks;
        _this.coverImgUrl = songlistData.data.playlist.coverImgUrl;
        _this.listname = songlistData.data.playlist.name;
        _this.trackIds = songlistData.data.playlist.trackIds;
        _this.creator = songlistData.data.playlist.creator;
      }));
//      console.log(IScroll)
//      new IScroll('#asd',{})
    },
    methods: {
      showhide(id, art, al) {
        this.show = this.show ? false : true;
        this.$store.state.readyToDoId = id;//选中歌曲的id
        this.$store.state.readyToDoArt = art[0].id;//目前只能看 这首歌的第一名歌手
        this.$store.state.readyToDoAl = al.id;//专辑id
      },
      toComment() {//去评论页
        let path = `/comment?id=${this.$store.state.readyToDoId}`;
        this.$router.push({path: path});
      },
      toArt() {//歌手页
        let path = `/art/${this.$store.state.readyToDoArt}`;
        this.$router.push({path: path});
      },
//      loadMore() {
//        this.disabled = true;
//        let data = JSON.parse(localStorage.getItem('songlistData'));
//        for (let i = 0; i < 5; i++) {
//          this.songlistData.push(data[i])
//        }
//
//      },
      _delete() {
        let pid = this.$route.query.id;
        let tracks = this.$store.state.readyToDoId;
        this.axios.get(this.HOST + `/playlist/tracks?op=del&pid=${pid}&tracks=${tracks}`).then((res) => {
          if (res.data.code === 200) {
            this.$toast('成功，但有一会延迟');
          } else {
            this.$toast('未知错误');
          }
        })
      },
      _toAlbum() {
        let id = this.$store.state.readyToDoAl;
        this.$router.push({path: '/album_z', query: {alId: id}})
      },
      _play(id) {
        let idarr = [];//只有歌曲id的数组
        for (let i = 0, len = this.trackIds.length; i < len; i++) {
          idarr.push(this.trackIds[i].id)
        }
        this.$store.state.trackIds = idarr;//放入播放列队


        let _this = this;
        this.$store.state.nowId = id;
        this.axios.all([
          this.axios.get(this.HOST + `/music/url?id=${id}`),
          this.axios.get(this.HOST + `/song/detail?ids=${id}`),
        ]).then(this.axios.spread((res, info) => {
          _this.$store.state.srcData = res.data.data[0];
          console.log(res.data)
          console.log('信息', info.data)//歌曲信息
          _this.$store.state.songInfo = info.data.songs[0];
        }));
        _this.$store.state.nowId = id;
        _this.$store.state.isplay = true;

      }
    },
    beforeRouteLeave(to, from, next) {
      this.$store.state.backTo = window.location.href;
      next()
    }
  }
</script>
<style scpoed>
  .left {
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .right {

  }

  .song_list {
    width: 78vw;
    margin: 10px 3vw;
    padding: 10px 8vw;
    background: ghostwhite;
    border-radius: 100px;
    box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .bg1 {
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -2;
    transform: scale(1.2);
    filter: blur(25px);
  }

  .bg2 {
    width: 100vw;
    height: 30vh;
    background: rgba(0, 0, 0, .4);
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
  }

  .header {
    margin: 60px 3vw 0 3vw;
    display: flex;
    justify-content: flex-start;
    color: white;
  }

  .h_r {
    /*padding-top:10px;*/
  }

  .h_l > img {
    width: 30vw;
    margin-right: 20px;
  }

  .main_bg {
    background: white;
    padding-top: 5px;
    margin-top: 8px;
  }

  .creator > img {
    border-radius: 40px;
    width: 40px;
  }

  .creator {
    margin-top: 20px;
    font-size: 12px;
  }
</style>
