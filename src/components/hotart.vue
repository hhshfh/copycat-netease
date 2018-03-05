<template>
  <div id="hotart" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <div style="margin-top: 51px;"></div>
    <div class="artlist">
      <div v-for="(i, index) in hotArt" v-on:click="toArt(i.id)">
        <div class="avatar_">
          <img v-lazy="i.img1v1Url" alt="">
        </div>
        <div class="i">
          <p class="name">{{i.name}}</p>
          <p class="s">单曲：{{i.musicSize}}</p>
          <p class="s">专辑数：{{i.albumSize}}</p>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name:'hotart',
    data: () => ({
      hotArt:[],
      page:0
    }),
    mounted(){
      this.axios.get(this.HOST+`/top/artists?offset=0&limit=32`).then((res)=>{
        console.log(res.data)
        this.hotArt=res.data.artists;//热门歌手
      })
    },
    methods:{
      toArt(id){//歌手页
        let path = `/art/${id}`;
        this.$router.push({path: path});
      },
      loadMore(){
        this.page+=32;
        let offset=this.page;
        this.axios.get(this.HOST+`/top/artists?offset=${offset}&limit=32`).then((res)=>{
          console.log(res.data)
          this.hotArt=this.hotArt.concat(res.data.artists);//热门歌手
        })
      }
    }
  }
</script>
<style scpoed>
  #hotart .avatar_>img {
    width:80px;
    /*border-radius: 100px;*/
  }
  #hotart .avatar_ {
    padding-left:5px;
  }
  #hotart .artlist {
    /*padding: 0 5px;*/
  }
  #hotart .artlist>div {
    /*width:25%;*/
    /*text-align: center;*/
    display: flex;
    justify-content: flex-start;
    background: ghostwhite;
    margin-bottom:5px;
  }
  #hotart p {
    margin: 0;
  }
  .name {
    font-size: 14px;
  }
  .s {
    font-size: 12px;
    color: grey;
  }
  .i {
    margin-left:15px;
    height:80px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>
