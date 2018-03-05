<template>
  <div id="alum" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <div class="albumMain">
      <div v-for="(i, index) in hotAlbums" class="list" v-on:click="_toAlbum(i.id)">
        <div class="albumbg">
          <img v-lazy="i.picUrl" alt="">
        </div>
        <div style="width: 100%">
          {{i.name}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name:'alum',
    data: () => ({
      hotAlbums:[],
      page:0,
      more:false
    }),
    mounted(){
      let id = this.$route.query.artId;//歌手id
      let _this=this;
      this.axios.all([
        this.axios.get(this.HOST+`/artist/album?id=${id}`)
      ]).then(this.axios.spread((artList)=>{
//        console.log(artList.data)
        _this.hotAlbums=artList.data.hotAlbums;
        if(artList.data.more){
          _this.more=true
        }
      }));
    },
    methods:{
      _toAlbum(id){
//        console.log(id)
        this.$router.push({path:'albumlist',query:{albumId:id}})
      },
      loadMore(){
        if(this.more){
          this.page+=20;
          this.axios.get(this.HOST+`/artist/album?id=${this.$route.query.artId}&offset=${this.page}`).then((res)=>{
//            console.log(res.data)
            this.hotAlbums=this.hotAlbums.concat(res.data.hotAlbums);
            if(!res.data.more){
              this.more=false
            }
          })
        }
      }
    }
  }
</script>
<style scpoed>
.albumbg>img {
  width: 90%;
  border-radius: 5px;
}
  .albumMain {
    width:96%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 2%;
    text-align: center;
    background: white;
  }
  .list {
    width: 50%;
    /*background: ghostwhite;*/
    padding: 2% 0;
    font-size: 14px;
  }
</style>
