<template>
  <div id="search" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <!--<input type="text" v-model="word">-->
    <!--<input type="button" value="搜索" v-on:click="_search()">-->
    <div class="searchBar">
      <div style="display: flex;align-items: center" onclick="window.history.back()">
        <van-icon name="arrow-left"/>
        <span>返回</span>
      </div>
      <div class="searchMain">
        <input type="text" v-model="keyword" @focus="_del()">
        <span class="close" v-on:click="_del()"><van-icon name="close"/></span>
        <span class="sbtn" v-on:click="_search()">搜索</span>
      </div>
    </div>
    <div class="omain">
      <div v-for="(i, index) in searchData" class="item">

        <div class="item_l">
          <div style="font-size: 14px;">{{i.name}}</div>
          <div style="font-size: 12px;color: grey;"><span v-for="(x, index) in i.artists">{{x.name}}</span>&nbsp;</div>
        </div>
        <div class="item_r">
          <van-icon name="play" v-on:click="_play(i.id)"/>
          <van-icon name="more-o" v-on:click="_showAc(i.id, i.artists)"/>
        </div>
      </div>
    </div>
    <!--弹出层-->
    <mt-actionsheet :actions="actions" v-model="sheetVisible">
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
    <!--<van-actionsheet v-model="sheetVisible" :actions="actions" />-->
  </div>
</template>
<script>
  export default {
    name: 'search',
    data: () => ({
      keyword: '输入歌曲/歌手/专辑',
      page: 0,
      songCount: 0,
      searchData: [],
      sheetVisible: false,
      popupVisible: false,
      actions: []
    }),
//    components:{
//       Actionsheet
//    },
    mounted() {
      this.actions = [{
        name: '添加到我喜欢的',
        method: this.addtoLike
      },
        {
          name: '收藏到歌单',
          method: this.addtoList
        },
        {
          name: '查看评论',
          method: this.toComment
        },
        {
          name: '歌手',
          method: this.toArt
        },
        {
          name: '专辑',
          zjId: 0
        }]
//      console.log(JSON.parse(localStorage.getItem('params')).profile.userId)
    },
    computed: {
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
    },
    methods: {
      _search() {
        let _this = this;
        this.axios.all([
          this.axios.get(this.HOST + `/search?keywords=${this.keyword}&offset=0`)
        ]).then(this.axios.spread((searchData) => {
          console.log(searchData.data);
          _this.songCount = searchData.data.result.songCount;
          _this.searchData = searchData.data.result.songs;
        }))
      },
      _del() {
        this.keyword = '';
      },
      _showAc(id,art) {//打开行动面板
        //0 添加歌单
        this.sheetVisible = this.sheetVisible ? false : true;
        this.$store.state.readyToDoId = id;//挂载选中歌曲的id
        this.$store.state.readyToDoArt = art[0].id;
        //1 查看评论

        //2 歌手信息
        //3 专辑
      },
      addtoLike() {
        let _this = this;
        let id = this.$store.state.readyToDoId;
        console.log(id)
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
          console.log(res.data)
          if(res.data.code===200){
            _this.popupVisible=false;
            _this.$toast('已收藏到'+name);
          }else{
            _this.$toast('吔？出错了');
          }
        }))
      },
      _play(id) {
        let idarr=[];//只有歌曲id的数组
        for(let i=0,len=this.searchData.length;i<len;i++){
          idarr.push(this.searchData[i].id)
        }
        this.$store.state.trackIds=idarr;//放入播放列队


        let _this = this;
        console.log(this.searchData)
        this.$store.state.nowId = id;
        this.axios.all([
          this.axios.get(this.HOST + `/music/url?id=${id}`),
          this.axios.get(this.HOST + `/song/detail?ids=${id}`),
        ]).then(this.axios.spread((res, info) => {
          _this.$store.state.srcData = res.data.data[0];
          console.log(res.data)
          console.log('信息', info.data)//歌曲信息
          _this.$store.state.songInfo = info.data.songs[0];
          _this.$store.state.playstate = '暂停';
        }));
        _this.$store.state.nowId = id;
      },
      loadMore() {
        let _this = this;
        this.page += 30;
        if (this.searchData.length && this.page >= this.songCount - 30) {
          this.$toast('么得了');
          return;
        }
        let page = this.page;
        this.axios.all([
          this.axios.get(this.HOST + `/search?keywords=${this.keyword}&offset=${page}`)
        ]).then(this.axios.spread((searchData) => {
          if (searchData.data.code === 200) {
            _this.searchData = _this.searchData.concat(searchData.data.result.songs)
          }
        }))
      },
      toComment() {//去评论页
        let path = `/comment?id=${this.$store.state.readyToDoId}`;
        this.$router.push({path: path});
      },
      toArt(){//歌手页
        let path = `/art/${this.$store.state.readyToDoArt}`;
        this.$router.push({path: path});
      }
    }
  }
</script>
<style scpoed>
  .searchBar {
    width: 96%;
    height: 50px;
    padding: 0 3%;
    background: rgb(234, 6, 6);
    color: white;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top: 0;
    z-index: 1;
  }

  .searchMain {
    width: 65%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right:3%;
  }

  .close {
    background: rgba(255, 255, 255, .4);
    padding: 2.3%;
    display: flex;
    align-items: center;
  }

  .searchMain > input {
    width: 80%;
    outline: none;
    border: none;
    background: rgba(255, 255, 255, .4);
    border-radius: 50px 0 0 50px;
    padding: 1% 5%;
    color: white;
  }

  .sbtn {
    width: 18%;
    display: inline-block;
    border-radius: 0 50px 50px 0;
    background: rgba(255, 255, 255, .4);
    padding: 1% 3%;
    text-align: center;
    transition: .3s all ease;
  }

  .sbtn:active {
    background: rgb(234, 6, 6);
  }

  .omain {
    margin-top: 40px;
  }

  .item {
    border-bottom: 1px solid rgb(234, 6, 6);
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .mylist {
    padding: 5px 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 14px;
  }
  .mylist img {
    width: 30px;
  }
</style>
