<template>
  <div id="newalbum" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <div style="margin-top: 51px;"></div>
    <div class="lists">
      <div v-for="(i, index) in newalbum" class="list_item" v-on:click="_toAlbum_z(i.id)">
        <div class="list_a">
          <img v-lazy="i.picUrl" alt="">
        </div>
        <div class="list_name">{{i.name}}</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name:'newalbum',
    data: () => ({
      offset:0,   //分页计数
      newalbum:[]
    }),
    mounted(){
      this.axios.get(this.HOST+`/top/album?offset=0&limit=21`).then((res)=>{
        this.newalbum=res.data.albums;
      })
    },
    methods:{
      loadMore(){
        this.offset+=21;
        let offset=this.offset;
        this.axios.get(this.HOST+`/top/album?offset=${offset}&limit=21`).then((res)=>{
          this.newalbum=this.newalbum.concat(res.data.albums);
          console.log(res.data)
        })
      },
      _toAlbum_z(id){
        this.$router.push({path:'/album_z',query:{alId:id}})
      }
    }
  }
</script>
<style scpoed>
  .list_item {
    margin-bottom:5px;
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
</style>
