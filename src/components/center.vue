<template>
  <div id="center">
    <div class="cheader" style="margin-top: 55px;">
      <div v-on:click="jingxuan()">
        <div class="icon">
          <van-icon name="records" style="font-size: 20px"/>
        </div>
        <p>精选歌单</p>
      </div>
      <div v-on:click="danqu()">
        <div class="icon">
          <van-icon name="gift" style="font-size: 20px"/>
        </div>
        <p>单曲推荐</p>
      </div>
      <div v-on:click="paihang()">
        <div class="icon">
          <van-icon name="exchange" style="font-size: 20px"/>
        </div>
        <p>排行榜</p>
      </div>
    </div>
    <div
      style="font-size: 14px;border-left: 2px solid red;margin: 0px 0 10px 0;padding: 5px 10px;display: flex;align-items: center"
      v-on:click="_toTj()">
      推荐歌单&nbsp;&nbsp;
      <van-icon name="arrow"/>
    </div>
    <div class="lists">
      <div v-for="(i, index) in rellist" class="list_item" v-on:click="_toAlbum(i.id)">
        <div class="list_a">
          <img v-lazy="i.picUrl" alt="">
        </div>
        <div class="list_name">{{i.name}}</div>
      </div>
    </div>
    <div
      style="font-size: 14px;border-left: 2px solid red;margin: 0px 0 10px 0;padding: 5px 10px;display: flex;align-items: center"
      v-on:click="_toNa()">
      新碟上架&nbsp;&nbsp;
      <van-icon name="arrow"/>
    </div>
    <div class="lists">
      <div v-for="(i, index) in newalbum" class="list_item" v-on:click="_toAlbum_z(i.id)">
        <div class="list_a">
          <img v-lazy="i.picUrl" alt="">
        </div>
        <div class="list_name">{{i.name}}</div>
      </div>
    </div>
    <div
      style="font-size: 14px;border-left: 2px solid red;margin: 0px 0 10px 0;padding: 5px 10px;display: flex;align-items: center"
      v-on:click="_tohotArt()">
      热门歌手&nbsp;&nbsp;
      <van-icon name="arrow"/>
    </div>
    <div class="arts">
      <div v-for="(i, index) in hotArt" v-on:click="toArt(i.id)">
        <div class="avatar">
          <img v-lazy="i.img1v1Url" alt="" style="box-shadow: 0 0 15px #ccc">
        </div>
        <p style="font-size: 12px;margin: 5px 0;">{{i.name}}</p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name:'center',
    data: () => ({
      lists:[],
      newsongs:[],
      newalbum:[],
      hotArt:[]
    }),
    mounted(){
      this.axios.get(this.HOST+`/personalized`).then((res)=>{
        this.lists=res.data.result;//推荐歌单
      })
      this.axios.get(this.HOST+`/top/album?offset=0&limit=9`).then((res)=>{
        console.log(res.data)
        this.newalbum=res.data.albums;//新碟上架
      })
      ///top/artists?offset=0&limit=30
      this.axios.get(this.HOST+`/top/artists?offset=0&limit=12`).then((res)=>{
        console.log(res.data)
        this.hotArt=res.data.artists;//热门歌手
      })
    },
    methods:{
      _toAlbum(id){//推荐歌单的内容
        this.$router.push({path:'/album',query:{alId:id}})
      },
      _toAlbum_z(id){//新碟上架的专辑内容
        this.$router.push({path:'/album_z',query:{alId:id}})
      },
      _toTj(){//全部推荐歌单
        this.$router.push({path:'/tjgd'})
      },
      _toNa(){//全部新碟上架
        this.$router.push({path:'/newalbum'})
      },
      _tohotArt(){//全部热门歌手
        this.$router.push({path:'/hotart'})
      },
      toArt(id){//歌手页
        let path = `/art/${id}`;
        this.$router.push({path: path});
      },
      jingxuan(){
        this.$router.push({path:'/jingxuan'})
      },
      danqu(){
        this.$router.push({path:'/danqu'})
      },
      paihang(){
        this.$router.push({path:'/paihang'})
      }
    },
    computed:{
      rellist(){
        let temp = this.lists;
        return temp.splice(0,6)
      }
    }
  }
</script>
<style scpoed>
  .list_item {
    margin-bottom:5px;
  }
  .list_a {
    width: 118px;
    height: 118px;
    overflow: hidden;
  }
  .list_a>img {
    width: 98%;
  }
  .lists {
    display: flex;
    flex-wrap: wrap;
  }
  .lists>div {
    width:33.33%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    word-break:break-all;
    font-size: 12px;
    text-align: center;
  }
  .list_name {
    width:90%;
  }
  .cheader {
    display: flex;
    justify-content: space-around;
    text-align: center;
  }

  .icon {
    width: 60px;
    height: 60px;
    border-radius: 70px;
    border: 1px solid red;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: red;
  }
  .cheader p {
    font-size: 12px;
  }
  .avatar>img {
    width:85%;
    border-radius: 100px;
  }
  .arts {
    display: flex;
    flex-wrap: wrap;
  }
  .arts>div {
    width:25%;
    text-align: center;
  }
</style>
